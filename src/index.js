import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import reducer from "./store/reducer";
import { combineReducers } from "redux";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
const rootReducer = combineReducers({
  jobs: reducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
