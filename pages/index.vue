<template>
  <div class="index-container">
    <SideNav v-on:clicked/>
    <div class="post">
      <h1 class="title">ホーム</h1>
      <div class="post-container">
        <table class="post-container-table">
          <tr v-for="item in postLists" :key="item.id" class="post-container-tr">
            <th class="post-container-th">{{  }}</th>
            <th class="post-container-th"><img @click="storeLike(); destroyLike()" class="heart-img" src="../img/heart.png"></th>
            <th class="post-container-th">{{ count }}</th>
            <th class="post-container-th"><img @click="deleteContent" class="delete-img" src="../img/cross.png"></th>
            <th class="post-container-th"><img @click="comment" class="detail-img" src="../img/detail.png"></th>
          </tr>
          <tr v-for="item in postLists" :key="item.id">
            <td>{{ item.newContent }}</td>
          </tr>
        </table>      
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      newContent: "",
      userID: "",
      postLists: [],
      count: "",
    };
  },

  mounted () {
    this.countLike();
  },

  methods: {
    async storeLike() {
      await this.$axios.post("http://127.0.0.1:8000/api/like/")
      .then(res => {
        this.count = res.data.count;
      });
    },
    async destroyLike() {
      await this.$axios.post("http://127.0.0.1:8000/api/like/")
      .then(res => {
        this.count = res.data.count;
      });
    },
    async countLike() {
      await this.$axios.post("http://127.0.0.1:8000/api/like/")
      .then(res => {
        this.count = res.data;
      });
    },

    async getPost() {
      const resData = await this.$axios.get("http://127.0.0.1:8000/api/post/");
      this.postLists = resData.data.data;
    },
    async deleteContact(id) {
      await this.$axios.delete("http://127.0.0.1:8000/api/post/" + id);
      this.getContact();
      },

    comment() {
      this.$router.push("/posts/id");
      },
    },
  };
</script>

<style>
.index-container {
  display: flex;
}

.post {
  width: 70vw;
  height: 100vh;
  background-color: #000033;
}

.title {
  color: white;
}
</style>

