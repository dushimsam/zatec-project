import styles from '../../styles/Navbar.module.scss'
import Router from "next/router";
import {APP_DETAILS} from "../../utils/constants";

export default function Navbar() {

    return (
        <div className={`row ${styles.appNav}   d-lg-flex`}>
            <div className={"col-md-6 col-12 justify-content-start"}>
                <div className={`${styles.link} ${styles.logo}`}>{APP_DETAILS.NAME}</div>
            </div>
            <div className={"col-md-6 col-12 mt-lg-0 mt-2 offset-0 offset-xl-1 col-xl-5 d-flex"}>
                <buton className={`btn ${styles.button} ${styles.outlined} d-flex justify-content-center`} onClick={() => Router.push("/auth/login")}>
                    LOGIN
                </buton>
                <button className={`${styles.button} cursor-pointer ml-2`} onClick={() => Router.push("/auth/register")}>
                    JOIN US
                </button>
            </div>
        </div>
    )
}