<template>
  <div class="index-container">
    <SideNav />
    <div class="post">
      <h1 class="title">ホーム</h1>
      <div class="post-container">
         
          <Message v-for="item in postLists.posts" :key="item.id" :item="postLists.posts" />
          
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
　created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.message = "ログイン済みです。";
        var uid = user.uid;
      }
      else {
        alert("ログインしてください。");
        this.$router.replace("/login");
      }
    });
  },

  data() {
    return {
      postLists: [],
      /*count: "",*/
    };
  },

  /*
  mounted () {
    this.countLike();
  },
  */

  created() {
    this.getPost();
  },

  methods: {
    async getPost() {
      const resData = await this.$axios.get("http://127.0.0.1:8000/api/post/");
      this.postLists = resData.data.data;
    },

    async deletePost(id) {
      await this.$axios.post("http://127.0.0.1:8000/api/post/destroy/" +id);
      this.getPost();
      }, 

  /*
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
  */

    comment() {
      this.$router.push("/posts/:id");
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

.heart-img {
  width:15%;
}

.delete-img {
  width: 15%;
}

.detail-img {
  width: 15%;
}

.post-container-table {
  width: 90%;
  border: 1px solid white;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.post-container-th {
  font-size: 25px;
  color: white;
}

.post-container-td {
  color: white;
}
</style>

