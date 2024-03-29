import firebase from "firebase"

// const firebaseConfig = {
//   apiKey: "AIzaSyA4LOYTg3VOKCWQ9upkUMNyNUEFvoZ_F_s",
//   authDomain: "blurtter-5bc24.firebaseapp.com",
//   databaseURL: "https://blurtter-5bc24-default-rtdb.firebaseio.com",
//   projectId: "blurtter-5bc24",
//   storageBucket: "blurtter-5bc24.appspot.com",
//   messagingSenderId: "340637433065",
//   appId: "1:340637433065:web:8f676f3c37b5f37b954478",
//   measurementId: "G-H07VP93ZBX",
// }

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)

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

export const addDevit = ({ avatar, content, img, userId, userName }) => {
  return db.collection("devits").add({
    avatar,
    content,
    userId,
    userName,
    createAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    img,
    sharedCount: 0,
  })
}

const mapDevitFromFirebaseToDevitObject = (doc) => {
  const data = doc.data()
  const id = doc.id
  const { createAt } = data

  return {
    ...data,
    id,
    createAt: +createAt.toDate(),
  }
}

// este callback nos va a ayudar a hacer la actualzacion en tiempo real
export const listenLatestDevist = (callback) => {
  return db
    .collection("devits")
    .orderBy("createAt", "desc")
    .limit(20)
    .onSnapshot(({ docs }) => {
      const newDevits = docs.map(mapDevitFromFirebaseToDevitObject)
      callback(newDevits)
    })
}

// export const fetchLatesDevits = () => {
//   return db
//     .collection("devits")
//     .orderBy("createAt", "desc")
//     .get()
//     .then(({ docs }) => {
//       return docs.map(mapDevitFromFirebaseToDevitObject)
//     })
// }

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`)
  const task = ref.put(file)
  return task
}
