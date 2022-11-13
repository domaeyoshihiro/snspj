<template>
  <div class="index-container">
    <SideNav />
    <div class="post">
      <h1 class="title">コメント</h1>
      <div class="post-container">
          
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";
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

<script>


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