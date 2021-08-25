import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyA4LOYTg3VOKCWQ9upkUMNyNUEFvoZ_F_s",
  authDomain: "blurtter-5bc24.firebaseapp.com",
  databaseURL: "https://blurtter-5bc24-default-rtdb.firebaseio.com",
  projectId: "blurtter-5bc24",
  storageBucket: "blurtter-5bc24.appspot.com",
  messagingSenderId: "340637433065",
  appId: "1:340637433065:web:8f676f3c37b5f37b954478",
  measurementId: "G-H07VP93ZBX",
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}

export const addDevit = ({ avatar, content, userId, userName }) => {
  return db.collection("devits").add({
    avatar,
    content,
    userId,
    userName,
    createAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

export const fetchLatesDevits = () => {
  return db
    .collection("devits")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createAt } = data

        return {
          ...data,
          id,
          createAt: +createAt.toDate(),
        }
      })
    })
}
