<template>
  <div class="index-container">
    <SideNav />
    <div class="post">
      <h1 class="title">ホーム</h1>
      <div class="post-container">
        <Message v-for="item in postLists.posts" :key="item.id" :item="item" @deleteData="reload" @storeLike="storeLike($event)" @deleteLike="deleteLike($event)" />  
        <h2 class="comment-title">コメント</h2>
        <div class="comment-list" v-for="item2 in commentLists[0]">
          <p class="comment-user">{{ item2.user.name }}</p>
          <p class="comment-comment">{{ item2.comment }}</p>
        </div>
          <div class="comment-share">
          <validation-observer ref="obs" v-slot="ObserverProps">
            <validation-provider v-slot="{ errors }" rules="required|max:120">
              <div class="error">{{ errors[0] }}</div>
              <label><input v-model="newComment" type="comment" class="comment-input" /></label>
            </validation-provider>
            <button @click="insertComment" class="comment-btn" :disabled="ObserverProps.invalid || !ObserverProps.validated">コメント</button>
          </validation-observer>
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
      newComment:"",
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

    insertComment() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const sendData = {
            comment: this.newComment, 
            user_id: this.$store.state.user.id,
            post_id: this.$route.params.id,
          };
        this.$axios.post("http://127.0.0.1:8000/api/comment/", sendData).then( res => {
        location.reload();
        })
        }
      })
    },
  }
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
  font-size: 22px;
  color: white;
  border-left: 1px solid white;
  border-bottom: 1px solid white;
  padding: 15px;
  margin: 0px;
}

.comment-title {
  font-size: 18px;
  font-weight: lighter;
  color: white;
  text-align: center;
  border-left: 1px solid white;
  border-bottom: 1px solid white;
  padding: 10px 0;
}

.comment-list {
  border-left: 1px solid white;
  border-bottom: 1px solid white;
}

.comment-user {
  font-size: 16px;
  color: white;
  padding-top: 10px;
  padding-left: 15px;
  margin: 0px;
}

.comment-comment {
  font-size: 14px;
  color: white;
  padding: 10px 15px;
  margin: 0px;
}

.comment-share {
  margin-left: 20px;
}

.comment-input {
  font-size: 14px;
  width: 95%;
  color: white;
  background-color: #000033;
  border: 1px solid #D3D3D3;
  border-radius: 10px;
  padding: 3px 0;
  margin-top: 20px;
  margin-bottom: 20px;
  resize: none;
}

.comment-btn {
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #FFFFFF;
  background-color: #00008B;
  border: 1px solid #00008B;
  border-radius: 30px;
  padding: 8px 20px;
  cursor: pointer;
  margin-left: auto;
  margin-right: 0px;
}

.error {
  font-size: 12px;
  color: red;
  margin-left: 30px;
}
</style>