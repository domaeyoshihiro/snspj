import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
  apiKey: "AIzaSyDpzHQ1yG4UJ6sjSk-_wOmAVXJHdHYU4LQ",
  authDomain: "snspj-c82c5.firebaseapp.com",
  projectId: "snspj-c82c5",
  storageBucket: "snspj-c82c5.appspot.com",
  messagingSenderId: "792001353358",
  appId: "1:792001353358:web:d630d09cc9212d2748dbdf",
  measurementId: "G-7WFRGQT0BM"
    }
  )
}

export default firebase
