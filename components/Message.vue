<template>
  <div class="post-container">
  　　<table class="post-container-table">
        <tr>
          <th class="post-container-th">{{ item.user.name }}</th>
          <th class="post-container-th"><img @click="storeLike(); destroyLike()" class="heart-img" src="../img/heart.png"></th>
          <th class="post-container-th">{{ bb }}</th>
          <th class="post-container-th"><img @click="deletePost(item.id)" class="delete-img" src="../img/cross.png"></th>
          <th class="post-container-th"><img @click="comment" class="detail-img" src="../img/detail.png"></th>
        </tr>
        <tr>
          <td class="post-container-td">{{ cc }}</td>
        </tr> 
      </table>
  </div>
</template>

<script>

import firebase from '~/plugins/firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  props: ['item'],
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