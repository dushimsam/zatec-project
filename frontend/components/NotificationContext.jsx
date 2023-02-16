import React, {useEffect, useState} from "react";

import {notificationService} from "../services";

import {play} from "../utils/NotificationSound";

import Router from "next/router";
import NavBarNotifications from "./NavbarNotification";


export default function NotificationContext({on_nav_bar = false}) {
    const [notifications, setNotifcations] = useState([]);
    const [unReadNotifications, setUnreadNotifications] = useState([]);
    const [defaultStateChanged, setDefaultStateChanged] = useState(false);

    const [totalUnreadNotification, setTotalUnreadNotifications] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false)

    const limit = 5;

    const move = (path, link) => {
        Router.push(link);
    }


    const sortData = (array) => {
        array.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return array;
    }

    useEffect(() => {
        (async function () {
            setLoading(true)
            try {
                let {data} = await notificationService.all(limit, page)
                setNotifcations(old => sortData([...old, ...data.docs]))
                setPage(page + 1)
                if (page + 1 >= data.totalPages) setDone(true)

                let {data: data1} = await notificationService.unread()
                setUnreadNotifications(data1);

            } catch (e) {
                console.log(e)
            }
            setLoading(false)
        })()
    }, [])

    const [newNotification, setNewNotification] = useState(null)

    useEffect(() => {
        setInterval(() => {
            (async function () {
                let {data} = await notificationService.new();
                if (data.length > 0) {
                    setUnreadNotifications(old => sortData([...data, ...old]))
                    setNewNotification(data[data.length - 1])
                }
            })()
        }, 11000)
    }, [])

    useEffect(async () => {
        if (newNotification) {
            await play()
            setNewNotification(null);
        }
    }, [newNotification]);


    const loadMoreNotifications = async () => {
        setLoading(true)
        try {
            let {data} = await notificationService.all(limit, page);
            setNotifcations([...notifications, ...data.docs])
            setTotalUnreadNotifications(totalUnreadNotification + data.totalDocs)
            setPage(page + 1)
            if (page === data.totalPages) setDone(true)
        } catch (e) {
            console.log(e.response.data)
        }
        setLoading(false)
    }

    if (on_nav_bar) return (<NavBarNotifications notifications={unReadNotifications}
                                                 setNotifications={setUnreadNotifications}/>)
    return (<></>)
}