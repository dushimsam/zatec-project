import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import Auth from "../middlewares/auth";

export const ForbiddenPage = ({ children }) => {
  const authUser = useSelector((state) => state.authUser);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const isActive = Auth.isActive();
    if (isActive) {
      Router.back();
    }
    setAllowed(true);
  }, [authUser]);

  return <>{allowed ? children : ""}</>;
};

export default ForbiddenPage;
