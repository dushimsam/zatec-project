import React from "react";
import moment from "moment";
import Router, {useRouter} from "next/router";
import {useSelector} from "react-redux";
import styles from "../styles/components/Notifications.module.css"
import {handleGoTo} from "../utils/notification_redirects";
import {notificationService} from "../services";

const Notification = ({notification, handleGoTo}) => {
    // console.log("notify ",notification)
    return (<div className={"col-12"}>
        <div className={"container"}>
            <div className={"row justify-content-center border-bottom py-2"}
                 onClick={() => handleGoTo(notification)}>
                <div className="col-12">
                    <div style={{whiteSpace: "initial"}}>{notification.message}</div>
                </div>
                <div className={"col-12"}>
                    <div
                        className="text-secondary mt-2 font-italic">{moment(notification.createdAt).fromNow()}</div>
                </div>
            </div>
        </div>
    </div>)
}

const badgeStyles = {
    backgroundColor: "green",
    position: "absolute",
    width: 22,
    height: 22,
    fontSize: 14,
    marginLeft: -8,
    marginTop: -8,
    paddingTop: 2,
    fontWeight: "bold"
}

export default function NavBarNotifications({
                                                notifications, setNotifications
                                            }) {
    const router = useRouter();

    const viewAll = async () => {
        await router.push("/account")
    }


    const markAllAsRead = async () => {
        try {
            const ids = notifications.map(notification => notification._id)
            await notificationService.markAsRead(ids)
            setNotifications([])
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    return (<div className="notifications cursor-pointer dropdown">
        <div data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={'none'}
                 style={{cursor: "pointer"}}
                 stroke="#707070" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 className="feather feather-bell">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            {notifications.length > 0 && <span className="bg-danger text-white text-center rounded-circle shadow"
                                               style={badgeStyles}>{notifications.length}</span>}
        </div>
        <div className="dropdown-menu dropdown-menu-right shadow mt-md-0 mr-md-3 mt-5">
            <div className="dropdown-header font-weight-bolder h4">Notifications</div>
            <div className="dropdown-divider"/>
            <div>
                <div className={"container " + styles.floatContainer}>
                    {notifications.slice(0, 4).map((notification, i) => (
                        <div key={i} className="row dropdown-item ">
                            <Notification notification={notification} handleGoTo={handleGoTo}/>
                        </div>))}
                    {notifications.length === 0 && (<div className="text-center">No new notifications</div>)}
                </div>
            </div>
            <div className="d-flex justify-content-between">
                <button className="dropdown-item mt-2 pt-2 text-center text-white font-weight-bolder" type="button"
                        onClick={viewAll}>View all
                </button>
                {notifications.length > 0 &&
                    <button className="dropdown-item mt-2 pt-2 text-center font-weight-bolder" type="button"
                            onClick={markAllAsRead}>Mark
                        all as read</button>}
            </div>
        </div>
    </div>)
}