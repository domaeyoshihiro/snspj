<template>
  <div class="container">
    <img class="header-logo" src="../img/logo.png">
    <div class="header-nav">
      <NuxtLink class="header-link" to="/register">新規登録</NuxtLink>
      <NuxtLink class="header-link" to="/login">ログイン</NuxtLink>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      message: 'ログインができておりません',
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.message = 'ログイン済みです'
      }
    })
  },
}
</script>

<style>
.container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #000033;
}

.header-logo {
  width: 20%;
  margin: 20px;
}

.header-nav {
  display: flex;
  align-items: center;
  margin-right: 20px;
  
}

.header-link {
  color: white;
  text-decoration: none;
  padding-right: 20px;
}

.message {
  color: white;
  margin-top: 30px;
}

</style>