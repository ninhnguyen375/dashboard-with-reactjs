import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// setup redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducer/rootReducer";
import thunk from "redux-thunk";
import ToHome from "./components/ToHome";

const store = createStore(rootReducer, applyMiddleware(thunk));
const MyApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" exact component={MyApp} />
      <Route path="/" exact component={ToHome} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
