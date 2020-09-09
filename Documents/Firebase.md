# Firebase from web project

__You must use ```await``` with all method what return Promise__

## Create project and Generate app

It will give you _Firebase SDK_
<br />
<br />

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
<br />
<br />

## Sign up and Log in

Default setting of log in is Local. So if you log in once, browser save this data in local.

You can change this setting as "session" or "none"
<br />

### Local account (email)

```js
await authService.createUserWithEmailAndPassword(email, password); // :Promise
await authService.signInWithEmailAndPassword(email, password); // :Promise
```
<br />


### Social account

```js
if (name === "google") {
  provider = new firebaseInstance.auth.GoogleAuthProvider();
} else if (name === "github") {
  provider = new firebaseInstance.auth.GithubAuthProvider();
}

await authService.signInWithPopup(provider);
```
<br />
<br />

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
<br />
<br />

## Add collection to Firestore (Firebase NoSql DB)

Firestore is consist of collection and document.

```
Collection - - Document - content
           L - Document - content
           L - Document - content

Collection - - Document - content
           L - Document - content
```

 ```js
 await dbService.collection("kweets").add({
      text: kweet,
      createdAt: Date.now(),
    });
 ```

![collection](./collection.jpg)

## Listener for any changing of firestore | Snapshot

```dbService.collection(COLLECTION).onSnapshot(CALLBACK)``` is listener for collection whenever there is any change.

Any changes include addition, delete, read and modification. So On init and realtime with tweet addition or delete or modification, this will be triggered.

```js
useEffect(() => {
    dbService.collection("kweets").onSnapshot((snapshot) => {
      const kweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setKweets(kweetArray);
    });
  }, []);
```