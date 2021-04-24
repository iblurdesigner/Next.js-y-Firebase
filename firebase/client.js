import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA4LOYTg3VOKCWQ9upkUMNyNUEFvoZ_F_s",
  authDomain: "blurtter-5bc24.firebaseapp.com",
  databaseURL: "https://blurtter-5bc24-default-rtdb.firebaseio.com",
  projectId: "blurtter-5bc24",
  storageBucket: "blurtter-5bc24.appspot.com",
  messagingSenderId: "340637433065",
  appId: "1:340637433065:web:8f676f3c37b5f37b954478",
  measurementId: "G-H07VP93ZBX",
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL } = user;

  return {
    avatar: photoURL,
    username: displayName,
    email,
  };
};

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = mapUserFromFirebaseAuthToUser(user);
    onChange(normalizedUser);
  });
};

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(githubProvider);
};
