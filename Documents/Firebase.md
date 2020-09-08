# Firebase from web project

## Create project and Generate app

It will give you _Firebase SDK_

## Initialize SDK

Create file to initialize and export firebase

```js
import * as firebase from "firebase/app";

var firebaseConfig = {
  apiKey: "*****-***************-*****",
  authDomain: "kwitter-*****.firebaseapp.com",
  databaseURL: "https://kwitter-*****.firebaseio.com",
  projectId: "kwitter-*****",
  storageBucket: "kwitter-*****.appspot.com",
  messagingSenderId: "*******",
  appId: "1:********:web:************",
  measurementId: "*-*********",
};

export default firebase.initializeApp(firebaseConfig);
```

## Sign up and Log in

Default setting of log in is Local. So if you log in once, browser save this data in local.

You can change this setting as "session" or "none"

### local account (email)

```js
await authService.createUserWithEmailAndPassword(email, password); // :Promise
await authService.signInWithEmailAndPassword(email, password); // :Promise
```

## Listener for initializing user state

```onAuthStateChanged()``` is triggered whenever user state is changed.

e.g. On log in, On log out, On Firebase initialize.

```js
useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
```