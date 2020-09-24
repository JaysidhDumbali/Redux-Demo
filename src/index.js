import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import allReducers from "./reducers";
import thunk from "redux-thunk";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const myStore = createStore(
  allReducers,
  composeEnhancer(applyMiddleware(thunk))
);

ReactDOM.render(
  <>
    <ThemeSwitcherProvider themeMap={themes} defaultTheme="light">
      <Provider store={myStore}>
        <App />
      </Provider>
    </ThemeSwitcherProvider>
  </>,
  document.querySelector("#root")
);
