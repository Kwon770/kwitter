# Router | react-router-dom

## Managing unhandled url

From this router, if you log out on '/profile', you will stay '/profile' logged out.

**Because LogOut router dont have '/profile' router, you will see empty session.**

```js
const AppRouter = ({ isLoggedIn }) => (
  <Router>
    {isLoggedIn && <Navigation />}
    <Switch>
      {isLoggedIn ? (
        <>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
        </>
      ) : (
        <Route exact path="/">
          <Auth />
        </Route>
      )}
    </Switch>
  </Router>
);
```

So you must handle this. There is two way.

1. Handle unhandled url with `<Redirect>`

If there is no route what matches url, you will go to route what is bottom of Router.

So you will face `<Redirect/>` what is bottom of Router.

```js
const AppRouter = ({ isLoggedIn }) => (
  <Router>
    {isLoggedIn && <Navigation />}
    <Switch>
      {isLoggedIn ? (
        <>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Redirect from="*" to="/" />
        </>
      ) : (
        <>
          <Route exact path="/">
            <Auth />
          </Route>
          <Redirect from="*" to="/" />
        </>
      )}
    </Switch>
  </Router>
);
```

2. Redirect browser with `useHistory()`

```js
import { useHistory } from "react-router-dom";

const history = useHistory();
const onLogOutClick = () => {
  authService.signOut();
  history.push("/");
};
```
