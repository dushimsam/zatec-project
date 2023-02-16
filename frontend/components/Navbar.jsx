import React, {useState, useEffect, useRef} from "react";
import Link from "next/link";

import styles from "../styles/modules/app.module.scss";
import {DEFAULT_VARIABLES, SYSTEM_USERS} from "../utils/constants"
import {useRouter} from "next/router";
import {AuthService} from "../services";
import Auth from "../middlewares/auth";

export const Navbar = () => {
    const [username, setUsername] = useState("...");
    const [profileUrl, setProfileUrl] = useState("...");
    const searchContainer = useRef(null)
    const router = useRouter();
    const [auth, setAuth] = useState(true);
    useEffect(() => {
        setAuth(Auth.isActive());
    }, []);

    const [category, setCategory] = useState(SYSTEM_USERS.MEMBER);


    useEffect(() => {
        const fetchData = async () => {
            try {
                let {data} = await AuthService.profile();
                setUsername(data.username);
                setCategory(data.category);
                setProfileUrl(data.profile_pic);
            } catch (e) {
            }

        };

        if (auth) {
            fetchData().then();
        }
    }, [auth]);

    const logOut = async () => {
        Auth.logout()
        await router.push("/auth/login");
    };

    const postText = "CREATE A POST"
    return (<div className={styles.navbar}>
        <div className="d-flex justify-content-between align-items-center h-100 px-2 px-lg-5 mx-lg-5">
            <div>
                {/* <Logo/> */}
            </div>
            <div className={"pt-4"}>
                {!auth ? (<React.Fragment>
                    <Link href={"/auth/login"}>Login</Link>
                    <Link href={"/auth/register"}>Register</Link>
                </React.Fragment>) : (<div className="d-flex">
                   
                    <div><img
                        src={profileUrl ? profileUrl : DEFAULT_VARIABLES.USER_PROFILE_PIC}
                        onError={({currentTarget}) => {
                            currentTarget.onerror = null;
                            currentTarget.src = DEFAULT_VARIABLES.USER_PROFILE_PIC
                        }}
                        className="_navbar-avatar mr-3"
                        alt="Avatar"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    />
                        <p style={{fontSize: "0.85em"}}>Profile</p>
                        <div
                            className="dropdown-menu dropdown-menu-right shadow"
                            aria-labelledby="dropdownMenuButton"
                        >
                                <span className="dropdown-item-text font-weight-bolder">
                                    {username}
                                </span>
                            <Link href={"/profile"} passHref>
                                <a className="dropdown-item">
                                    Account
                                </a>
                            </Link>
                            <Link href={"/profile/settings"} passHref>
                                <a className="dropdown-item">
                                    Profile Settings
                                </a>
                            </Link>
                            {category === SYSTEM_USERS.ADMIN ? <Link href={"/admin/manage"} passHref>
                                <a className="dropdown-item">
                                    Manage Settings
                                </a>
                            </Link> : <></>}

                            <a className="dropdown-item" onClick={logOut}>
                                Log out
                            </a>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    </div>);
};
