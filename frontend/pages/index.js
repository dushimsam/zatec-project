//Import necessarry components
import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/modules/auth.module.scss";
import Validator from "validatorjs";
import { AuthService } from "../services";
import Router, { useRouter } from "next/router";
import { APP_DETAILS, KEYS } from "../utils/constants";
import { notifyError, notifySuccess } from "../utils/alerts";
import RouteService from "../middlewares/routing";
import Auth from "../middlewares/auth";
import ForbiddenPage from "../layouts/ForbiddenPage";

export default function Login() {
  // Initialize the useRouter hook to navigate between pages
  const router = useRouter();

  // Initialize the useRef hook to obtain the value of input fields
  const emailOrUsernameContainer = useRef(null);
  const passWordContainer = useRef(null);

  // Set up initial errors as an empty object
  const initialErrors = {
    login: [],
    password: [],
  };

  // Set up a state variable to track validation errors
  const [errors, setErrors] = useState(initialErrors);

  // Define a helper function to extract the value of an input field
  const getValue = (container) => container.current.value;

  // Use the useEffect hook to check if the user is already authenticated
  useEffect(() => {
    const fetchData = async () => {
      const isActive = Auth.isActive();
      if (isActive) return await router.push("/home");
    };
    fetchData().then();
  }, []);

  // Define a function to handle form submission
  const submitForm = async (event) => {
    try {
      // Prevent the default form submission behavior
      event.preventDefault();
      // Retrieve the login and password values from the input fields
      const user = {
        login: getValue(emailOrUsernameContainer),
        password: getValue(passWordContainer),
      };

      // Use the Validator library to validate the user object against certain rules
      let valid = new Validator(user, {
        login: "required|min:4",
        password: "required|string|min:8",
      });

      // If there are any validation errors, update the errors state variable
      if (valid.fails(undefined))
        return setErrors({ ...initialErrors, ...valid.errors.all() });

      // If there are no validation errors, attempt to log in the user
      if (valid.passes(undefined)) {
        setErrors(initialErrors);
        let data = await AuthService.login(user);

        // If a token is received, set it in the Auth utility and notify the user of successful login
        if (data.data.token) {
          Auth.setToken(data.data.token);
          notifySuccess("Logged in successfully");

          // If there is a previously stored route, navigate the user there
          if (RouteService.getPrevRoute()) {
            let link = RouteService.getPrevRoute();
            RouteService.removePrevRoute();
            await Router.push(link);
          } else {
            // Otherwise, redirect the user to the home page
            window.location.href = "/home";
          }
        }
      }
    } catch (e) {
      // Handle any errors that may occur during the login process
      if (e.response?.status === 400)
        return setErrors({ ...initialErrors, ...e.response.data });
        notifyError(e.response?.data.message);
    }
  };

  return (
    <ForbiddenPage>
      <Head>
        <title>Log in - {APP_DETAILS.NAME_FULL} </title>
      </Head>
      <div className="row mx-0">
        <div className="col-lg-8 col-7">
          <div className="vh-100 d-md-flex flex-md-column align-items-center justify-content-center mt-5 mt-lg-0">
            <h1 className="font-weight-bolder _color-primary pb-5">
              Log in into your account
            </h1>
            <form action="" onSubmit={submitForm}>
              <div className="form-group">
                <label htmlFor="login">Email or username</label>
                <input
                  type="text"
                  ref={emailOrUsernameContainer}
                  id="login"
                  className={`form-control col-12 ${
                    errors.login.length > 0 && "is-invalid"
                  } _input`}
                />
                <div className="invalid-feedback">{errors.login[0]}</div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  ref={passWordContainer}
                  id="password"
                  className={`form-control col-12 ${
                    errors.password.length > 0 && "is-invalid"
                  } _input`}
                />
                <div className="invalid-feedback">{errors.password[0]}</div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn _btn text-white px-5 py-2 my-4 rounded-pill"
                >
                  SIGN IN
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-4 col-5 _bg-primary px-0 font-weight-bolder text-white text-center">
          <div
            className={`${styles.right_bar} d-md-flex flex-md-column align-items-center mt-5 mt-lg-0 justify-content-center`}
          >
            <h1 className="pb-4 font-weight-bolder">Hello, Friend !</h1>
            <p className="font-weight-light">
              Enter your credentials to start <br /> journey with us
            </p>
            <Link href={"/register"}>
              <button className="btn btn-side border border-white text-white px-5 py-2 my-5 rounded-pill">
                SIGN UP
              </button>
            </Link>
          </div>
        </div>
      </div>
    </ForbiddenPage>
  );
}
