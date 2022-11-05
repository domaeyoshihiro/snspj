<template>
  <div class="sidenav">
    <img class="sidenav-img" src="../img/logo.png">
    <div class="sidenav-home">
      <img class="sidenav-home-img" src="../img/home.png">
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
          <textarea name="textarea" cols="30" rows="3" class="sidenav-share-textarea" v-model="newContent"></textarea>
        </validation-provider>
        <button @click="insertPost" class="sidenav-share-btn" :disabled="ObserverProps.invalid || !ObserverProps.validated">シェアする</button>
      </validation-observer>

      

    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import { getAuth } from 'firebase/auth'

export default {
  data() {
    return {
      newContent:"",
      userID:"",
      postLists: [],
    };
  },
  methods: {
    logout() {
      firebase
      .auth()
      .signOut()
      .then(() => {
      alert('ログアウトが完了しました')
      this.$router.replace('/login')
      })
    },
    async getPost() {
      const resData = await this.$axios.get(
      "http://127.0.0.1:8000/api/post/"
      );
      this.postLists = resData.data.data;
    },
    async insertPost() {
      const userRecord = await getAuth().getUser(userId);
      const sendData = {
      name: this.newContent, 
      userID: this.userID,
      };
      this.$emit('clicked');
      await this.$axios.post("http://127.0.0.1:8000/api/post/", sendData);
      this.getContact();
    },
  },
};
</script>

<style>
.sidenav {
  width: 30vw;
  height: 100vh;
  background-color: #000033;
}

.sidenav-img {
  width: 40%;
  margin: 20px;
}

.sidenav-home {
  display: flex;
}

.sidenav-home-img {
  width: 10%;
  margin: 20px;
}

.sidenav-home-text {
  color: white;
}

.sidenav-logout {
  display: flex;
}

.sidenav-logout-img {
  width: 10%;
  margin: 20px;
}

.sidenav-logout-text {
  color: white;
}

.sidenav-share {
  margin-left: 20px;
}

.sidenav-share-text {
  color: white;
}

.sidenav-share-textarea {
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
  border: 1px solid #D3D3D3;
  border-radius: 30px;
  padding: 8px 20px;
  cursor: pointer;
  margin-left: auto;
  margin-right: 30px;
}
</style>