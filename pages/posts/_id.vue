<template>
  <div class="index-container">
    <SideNav />
    <div class="post">
      <h1 class="title">ホーム</h1>
      <div class="post-container">
        <Message v-for="item in postLists.posts" :key="item.id" :item="item" />  
        <div class="comment-list" v-for="item in commentLists">
          <h2 class="comment-title">コメント</h2>
          <p class="comment-user">{{ item }}</p>
          <p class="comment-comment">{{  }}</p>
        </div>
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
      commentLists: [],
    };
  },

  created() {
    this.getPost();
  },

  methods: {
    async getPost() {
      const resData = await this.$axios.get("http://127.0.0.1:8000/api/post/" + this.$route.params.id);
      this.postLists = resData.data.data;

      const item2 = this.postLists.posts.map((array) => {
        return array.comments
      })
      this.commentLists = item2;
    }
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
}
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

.comment-title {
  font-size: 20px;
  color: white;
  text-align: center;
  border-left: 1px solid white;
  border-bottom: 1px solid white;
  padding: 15px;
  margin: 0px;
}

.comment-user {
  color: white;
}

.comment-content {
  color: white;
}
</style>