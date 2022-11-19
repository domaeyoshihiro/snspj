<template>
  <div class="index-container">
    <SideNav />
    <div class="post">
      <h1 class="title">ホーム</h1>
      <div class="post-container">  
        <Message v-for="item in postLists.posts" :key="item.id" :item="item"　@deleteData="reload" @storeLike="storeLike($event)" @deleteLike="deleteLike($event)" />
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
    };
  },

  created() {
    this.getPost();
  },

  methods: {
    async getPost() {
      const resData = await this.$axios.get("http://127.0.0.1:8000/api/post/");
      this.postLists = resData.data.data;
    },

    reload() {
    location.reload();
    },

    storeLike(item) {
      const sendData = {
        post_id: item.id, 
        user_id: this.$store.state.user.id,
      };
   　　this.$axios.post("http://127.0.0.1:8000/api/like/", sendData).then( res => {
        location.reload();
      })
    },
    deleteLike(item) {
      const sendData = {
        post_id: item.id, 
        user_id: this.$store.state.user.id,
      };
   　　this.$axios.post("http://127.0.0.1:8000/api/like/destroy/", sendData).then( res => {
        location.reload();
      })
    },

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
  font-size: 24px;
  color: white;
  border-left: 1px solid white;
  border-bottom: 1px solid white;
  padding: 15px;
  margin: 0px;
}

</style>

