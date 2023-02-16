import React, {useEffect, useState} from "react";
import Head from "next/head";
import {Navbar} from "../components/Navbar";
import AuthService from "../services/auth.service";
import Footer from "../components/Reusable/Footer";
import ListClubs from "../components/Club/ListClubs";
import RouteProtector from "../middlewares/routeProtector";
import {SYSTEM_USERS} from "../utils/constants";

export function DefaultLayout({children, meta, append_questions}) {

    return (<RouteProtector only={[SYSTEM_USERS.ADMIN, SYSTEM_USERS.MEMBER, SYSTEM_USERS.MODERATOR]}>
            <React.Fragment>
                <Head>
                    <title>{meta.title}</title>
                </Head>
                <div>
                    <header>
                        <Navbar/>
                    </header>
                    <main className=" pb-5" style={{background: '#F4F7F8'}}>
                        {children}
                    </main>
                    <footer>
                        <Footer/>
                    </footer>
                </div>
                <ListClubs/>
            </React.Fragment>
        </RouteProtector>

    );
}
