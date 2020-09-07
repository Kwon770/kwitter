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
