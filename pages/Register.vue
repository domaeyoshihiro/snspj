<template>
  <div class="register">
    <AuthHeader/>
    <div class="register-content">
      <h1 class="register-title">新規登録</h1>
      <validation-observer ref="obs" v-slot="ObserverProps">
      <validation-provider v-slot="{ errors }" rules="required|max:20">
        <div class="error">{{ errors[0] }}</div>
        <label><input v-model="name" type="name" name="ユーザーネーム" class="register-input" placeholder="ユーザーネーム"　required/></label>
      </validation-provider>
      <br />
      <label><input v-model="email" type="email" class="register-input" placeholder="メールアドレス" required　/></label>
      <br />
      <label><input v-model="password" type="password" class="register-input"　placeholder="パスワード" required/></label>
      <br />
      <button @click="register" class="register-btn" :disabled="ObserverProps.invalid || !ObserverProps.validated">新規登録</button>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      name: null,
      email: null,
      password: null,
    }
  },
  methods: {
    async register() {
      try {
        await this.$axios.post("http://localhost:8000/api/user", {
        name: this.name,
        email: this.email,
        password: this.password,
      });

      if (!this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }
    
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user.sendEmailVerification().then(() => {
            this.$router.replace('/login')
          })
        })

        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/email-already-in-use':
              alert('このメールアドレスはすでに使われています。')
              break
            case 'auth/weak-password':
              alert('パスワードは6文字以上で入力してください。')
              break
            default:
              alert('エラーが起きました。しばらくしてから再度お試しください。')
              break
          }
        })
    },
  },
}
</script>

<style>
.register {
  background-color: #000033;
  height: 100vh;
}
.register-content {
  display: block;
  text-align: center;
  margin: 100px auto;
  padding: 20px 0;
  border-radius: 10px;
  background-color:	#FFFFFF;
  width: 35%;
}

.register-title {
  font-size: 20px;
}

.register-input {
  width: 80%;
  height: 30px;
  margin-bottom: 10px;
  border: 1px solid #D3D3D3;
  border-radius: 10px;
}

.register-btn {
  font-size: 14px;
  font-weight: bold;
  color: #FFFFFF;
  background-color: #00008B;
  border: 1px solid #D3D3D3;
  border-radius: 30px;
  padding: 8px 20px;
  cursor: pointer;
}

.error {
  font-size: 12px;
  color: red;
  text-align: left;
  margin-left: 30px;
}
</style>