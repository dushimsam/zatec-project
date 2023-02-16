import styles from "../styles/components/sidebar.module.scss"
import Link from "next/link"
import Router from "next/router";
import { APP_DETAILS } from "../utils/constants";
import { useEffect, useState } from "react";

const navList = [ {
    name: "Album",
    href: "/home/#album",
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path
                d="M2 22a8 8 0 1 1 16 0h-2a6 6 0 1 0-12 0H2zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm8.284 3.703A8.002 8.002 0 0 1 23 22h-2a6.001 6.001 0 0 0-3.537-5.473l.82-1.824zm-.688-11.29A5.5 5.5 0 0 1 21 8.5a5.499 5.499 0 0 1-5 5.478v-2.013a3.5 3.5 0 0 0 1.041-6.609l.555-1.943z"
                fill="rgba(112,112,112,1)"/>
        </svg>
    )
},
{
    name: "Genre",
    href: "/home/#genre",
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path
                d="M2 20h20v2H2v-2zm2-8h2v7H4v-7zm5 0h2v7H9v-7zm4 0h2v7h-2v-7zm5 0h2v7h-2v-7zM2 7l10-5 10 5v4H2V7zm2 1.236V9h16v-.764l-8-4-8 4zM12 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                fill="rgba(112,112,112,1)"/>
        </svg>
    )
},
{
    name: "Featured Songs",
    href: "/home/#featured",
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path
                d="M2 20h20v2H2v-2zm2-8h2v7H4v-7zm5 0h2v7H9v-7zm4 0h2v7h-2v-7zm5 0h2v7h-2v-7zM2 7l10-5 10 5v4H2V7zm2 1.236V9h16v-.764l-8-4-8 4zM12 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                fill="rgba(112,112,112,1)"/>
        </svg>
    )
}]

export default function Sidebar() {
     const [pathname,setPathName] = useState("/home");

    useEffect(()=>{
        const path = window.location.pathname;
        const fragment = window.location.hash;
        const secondPart = path + fragment; 
    },[])
    return (
        <div className="bg-white vh-100 border-right pt-2 pb-4 pl-4">
             <Link href="/" passHref>
            <div className="cursor-pointer" >
                                <img src={APP_DETAILS.APP_LOGO}
                                height={50}
                                width={50}
                                alt="Logo ..."
                                className="mr-2"
                            />
                <span style={{color: '#707070',fontWeight:"bolder"}}>{APP_DETAILS.APP_NAME}</span>
            </div>
        </Link>
            <hr/>
            <div className="dashboard my-3">
                <Link href={'/home'} passHref>
                    <div
                      style={{color: '#707070'}}  className={"d-flex px-3 py-2 rounded-sm align-items-center mr-3 " + (pathname === "/home" ? styles.sidebarActiveLink : styles.sidebarLink)}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                                <path fill="none" d="M0 0h24v24H0z"/>
                                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
                                      fill="rgba(108,117,125,1)"/>
                            </svg>
                        </div>
                        <div className="pl-4">
                            <span style={{ fontSize: '15px' }}>Dashboard</span>
                        </div>
                    </div>
                </Link>
            </div>
            <h6 style={{fontSize: 14}} className="font-weight-light text-secondary mr-4">MAIN MENU</h6>
            <div className={"main-menu "+styles.mainMenu}>
                {
                    navList.map((list, i) => (
                        <Link href={list.href} key={i} passHref>
                            <div
                                className={"d-flex px-3 py-2 rounded-sm align-items-center mb-2 text-secondary mr-3 " +  (pathname === list.href ? styles.sidebarActiveLink : styles.sidebarLink)}>
                                <div style={{marginTop: '-5px'}}>
                                    {list.icon}
                                </div>
                                <div className="pl-4" style={{fontSize: 15}}>
                                    {list.name}
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}