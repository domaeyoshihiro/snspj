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
    login() {
      if (!this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert('ログインが完了しました')
          this.$router.push('/')
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/user-disabled':
              alert('ユーザーが無効になっています。')
              break
            case 'auth/user-not-found':
              alert('ユーザーが存在しません。')
              break
            case 'auth/wrong-password':
              alert('パスワードが間違っております。')
              break
            default:
              alert('エラーが起きました。しばらくしてから再度お試しください。')
              break
          }
        })
      },
    },
    async authSuccessful (response) {
      await this.$auth.login(response)
      console.log(this.$store.state.current.user)
    },
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
  font-size: 20px;
}

.login-input {
  width: 80%;
  height: 30px;
  margin-bottom: 10px;
  border: 1px solid #D3D3D3;
  border-radius: 10px;
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