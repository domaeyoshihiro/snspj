<template>
  <div class="post-container">
  　　<div class="post-container-wrapper">
        <div class="post-container-upper">
          <p class="post-container-name">{{ item }}</p>
            <img @click="onLikeClick" class="heart-img" src="../img/heart.png">
          {{ count }}
          <img @click="deletePost(item.id)" class="delete-img" src="../img/cross.png">
          <img @click="moveComment" class="detail-img" src="../img/detail.png">
        </div>
          <p class="post-container-content">{{ item.content }}</p>
      </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  props: ['item'],

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.message = "ログイン済みです。";
        var uid = user.uid;
      }
      else {
        this.$router.replace("/login");
      }
    });
  },

  data() {
    return {
      postLists: [],
      count: "",
    };
  },

  methods: {
    async deletePost(id) {
      await this.$axios.post("http://127.0.0.1:8000/api/post/destroy/" +id);
      this.$emit('deleteData');
    }, 

    onLikeClick() {
      if(id == this.item.likes.user_id) {
        this.$emit('deleteLike');
      }
      else {
        this.$emit('storeLike', item);
      }
    },

    moveComment() {
      this.$router.push("/posts/:id");
      },
    },
  };
</script>

<style>
.heart-img {
  width: 30px;
  height: 30px;
  padding-right: 30px;
  padding-left: 20px;
}

.delete-img {
  width: 30px;
  height: 30px;
  padding-right: 50px;
}

.detail-img {
  width: 30px;
  height: 30px;
}

.post-container-wrapper {
  width: 100%;
  border-left: 1px solid white;
  border-bottom: 1px solid white;
  padding-top: 20px;
  margin-bottom: 0px;
}

.post-container-upper {
  display: flex;
  margin: 0 20px;
}

.post-container-name {
  font-size: 18px;
  font-weight: bold;
  color: white;
  margin: 0;
}

.post-container-content {
  font-size: 14px;
  color: white;
  margin: 15px;
}
</style>