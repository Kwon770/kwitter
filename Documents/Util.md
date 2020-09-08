# React Utility

## Env

Using .env to use important data without exposure to repository

```env
...
REACT_APP_API_KEY=*****-**********-*****
REACT_APP_AUTH_DOMAIN=kwitter-*****.firebaseapp.com
...
```

If you write env variable like this, you can use this from everywhere.

```js
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APP_ID,
  // ...
}
```

### The rule of env variable's name

```REACT_APP_ + {name}```

You must add ```REACT_APP_``` to make react cognize env variables


## Absolute import

You can set base url to simlify import path

jsconfig.json
```json
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

```js
// AppRouter is in './src/components/AppRouter.js'
import AppRouter from 'components/AppRouter'
```