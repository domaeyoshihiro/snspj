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
export default {
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

<script>


<style>

</style>