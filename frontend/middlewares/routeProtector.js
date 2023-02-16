import { useEffect, useState } from "react";
import jwt from "jwt-decode";
import NotFound from "../pages/404";
import Router from "next/router";
import { KEYS } from "../utils/constants";
import Auth from "./auth";

export default function RouteProtector({ children }) {
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    if (Auth.isLoggedIn() && !Auth.tokenExpired()) {
      setLoading(false);
    } else {
      localStorage.setItem(KEYS.PREV_LINK_LOCAL_STORAGE_KEY, Router.asPath);
      await Router.push("/");
    }
  }, []);

  if (loading) return <div />;
  return children;
}
