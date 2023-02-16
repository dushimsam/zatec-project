import React, { useEffect } from "react";
import Router from "next/router";
import NProgress from "nprogress";
import { Provider, useDispatch } from "react-redux";
import reducer from "../store/reducers";
import "reactjs-popup/dist/index.css";
import "bootstrap/scss/bootstrap.scss";
import "font-awesome/scss/font-awesome.scss";
import "../styles/globals.scss";
import "nprogress/nprogress.css";
import { APP_DETAILS } from "../utils/constants";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { createStore } from "redux";
import { setAuthUser } from "../store/actions";
import Auth from "../middlewares/auth";
import AuthService from "../services/auth.service";

NProgress.configure({ showSpinner: true });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

let store = createStore(reducer);

if (typeof window !== "undefined") {
  require("jquery");
  require("popper.js");
  require("bootstrap");
}

function AppMeta() {
  useEffect(() => {
    setUser();
  });
  const dispatch = useDispatch();

  const setUser = async () => {
    if (Auth.isLoggedIn() && !Auth.tokenExpired()) {
      let profile = await AuthService.profile();
      dispatch(setAuthUser(profile.data));
    }
  };
  return (
    <Head>
      <title>{APP_DETAILS.NAME}</title>
      <meta name={"description"} content={"Music management system"} />
      <meta property={"og:title"} content={"Social Media"} />
      <link rel="icon" href={APP_DETAILS.APP_LOGO_ICO} />
      <meta name="keywords" content="music,social,clubs,listenning" />
      <meta name="application-name" content={APP_DETAILS.NAME} />
      <meta name="author" content="SAMUEL DUSHIMIMANA" />
      <meta property="og:description" content={"Listening to Music for fun"} />
    </Head>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Toaster reverseOrder={false} />
      <AppMeta />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
