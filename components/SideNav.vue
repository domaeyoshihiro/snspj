<template>
  <div class="sidenav">
    <img class="sidenav-img" src="../img/logo.png">
    <div class="sidenav-home">
      <img @click="home" class="sidenav-home-img" src="../img/home.png">
      <p class="sidenav-home-text">ホーム</p>
    </div>
    <div class="sidenav-logout">
      <img @click="logout" class="sidenav-logout-img" src="../img/logout.png" >
      <p class="sidenav-logout-text">ログアウト</p>
    </div>
    <div class="sidenav-share">
      <p class="sidenav-share-text">シェア</p>
      <validation-observer ref="obs" v-slot="ObserverProps">
        <validation-provider v-slot="{ errors }" rules="required|max:120">
          <div class="error">{{ errors[0] }}</div>
          <textarea name="textarea" cols="30" rows="7" class="sidenav-share-textarea" v-model="newContent"></textarea>
        </validation-provider>
        <button @click="insertPost" class="sidenav-share-btn" :disabled="ObserverProps.invalid || !ObserverProps.validated">シェアする</button>
      </validation-observer>
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

  data() {
    return {
      newContent:"",
      firebaseid:"",
    };
  },

  methods: {
    home() {
      this.$router.replace('/')
    },

    logout() {
      firebase
      .auth()
      .signOut()
      .then(() => {
      alert('ログアウトが完了しました')
      this.$router.replace('/login')
      })
    },

    insertPost() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const sendData = {
          content: this.newContent, 
          firebaseid: user.uid,
          };
        this.$axios.post("http://127.0.0.1:8000/api/post/", sendData).then( res => {
        location.reload();
        })
        }
      })
    },
  },
}
</script>

<style>
.sidenav {
  width: 30vw;
  height: 100vh;
  background-color: #000033;
}

.sidenav-img {
  width: 100px;
  margin-top: 20px;
  margin-left: 20px;
}

.sidenav-home {
  display: flex;
}

.sidenav-home-img {
  width: 25px;
  height: 25px;
  margin:0 20px 10px;
}

.sidenav-home-text {
  color: white;
}

.sidenav-logout {
  display: flex;
}

.sidenav-logout-img {
  width: 25px;
  height: 25px;
  margin: 0px 20px 30px;
}

.sidenav-logout-text {
  color: white;
  margin-top: 0px;
}

.sidenav-share {
  margin-left: 20px;
}

.sidenav-share-text {
  color: white;
}

.sidenav-share-textarea {
  font-size: 14px;
  width: 80%;
  color: white;
  background-color: #000033;
  border: 1px solid #D3D3D3;
  border-radius: 10px;
  margin-bottom: 20px;
  resize: none;
}

.sidenav-share-btn {
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
  margin-right: 40px;
}

.error {
  font-size: 12px;
  color: red;
  margin-left: 30px;
}
</style>