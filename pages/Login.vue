<template>
  <div class="login">
    <AuthHeader/>
    <div class="login-content">
      <h1 class="login-title">ログイン</h1>
      <label><input v-model="email" type="email" class="login-input" placeholder="メールアドレス" required　/></label>
      <br />
      <label><input v-model="password" type="password" class="login-input"　placeholder="パスワード" required/></label>
      <br />
      <button @click="login" class="login-btn">ログイン</button>
    </div>
  </div>
</template>


<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      email: null,
      password: null,
    }
  },
  methods: {
    login(email, password) {
     this.$store.dispatch('login', {email: this.email, password: this.password})
   },
  }
}
</script>

<style>
.login {
  background-color: #000033;
  height: 100vh;
}
.login-content {
  display: block;
  text-align: center;
  margin: 100px auto;
  padding: 20px 0;
  border-radius: 10px;
  background-color:	#FFFFFF;
  width: 35%;
}

.login-title {
  font-size: 16px;
  margin-bottom: 16px;
}

.login-input {
  font-size: 12px;
  width: 80%;
  height: 30px;
  margin-bottom: 16px;
  border: 1px solid #D3D3D3;
  border-radius: 5px;
}

.login-btn {
  font-size: 14px;
  font-weight: bold;
  color: #FFFFFF;
  background-color: #00008B;
  border: 1px solid #D3D3D3;
  border-radius: 30px;
  padding: 8px 20px;
  cursor: pointer;
}
</style>