import {useEffect, useState} from "react"
import "./Settings_page.css"
import Fire from "../config/Fire"


function Settings_page ({set_theme, theme, user}) {

    const [settings_page_browsersupport, set_settings_page_browsersupport] = useState("settings_page_mainbox")
    const [settings_page_theme_text_display, set_settings_page_theme_text_display] = useState("")

    const browser = () => {
        if (navigator.userAgent.indexOf("Firefox") > -1 === true) {
            set_settings_page_browsersupport("settings_page_mainbox__MOZILLA")
        }
        else {
            set_settings_page_browsersupport("settings_page_mainbox")
        }
    }

    const user_theme = () => {
        Fire.database().ref("Users_data/" + user.uid + "/settings").once("value")
        .then((snapshot) => {
            console.log(snapshot.val())
        })
    }

    const signout = () => {
        Fire.auth().signOut()
        .then(() => {
            window.alert("You have been signout !")
            window.location.reload()
        })
        .catch((error) => {
            //error
            window.alert(error.code)
        })
    }

    const toggle_theme = () => {
        if (theme === "light") {
            set_theme("dark")
        }
        if (theme === "dark") {
            set_theme("light")
        }
    }

    const theme_text_display = () => {
        if (theme === "light") {
            set_settings_page_theme_text_display("Switch to dark mode")
        }
        if (theme === "dark") {
            set_settings_page_theme_text_display("Switch to light mode")
        }
    }


    useEffect(() => {
        browser()
    }, [])

    useEffect(() => {
        theme_text_display()
        user_theme()
    }, [theme])


    return(
        <div className = {settings_page_browsersupport}>
            <div className = "settings_title_box"><h1 className = "settings_title">Settings</h1></div>
            <div className = "settings_box">
                <div className = "settings_change_theme_box">
                    <h3 className = "settings_change_theme" onClick = {toggle_theme}>{settings_page_theme_text_display}</h3>
                </div>
                <div className = "settings_change_username_box">
                    <h3 className = "settings_change_username">Change user name</h3>
                </div>
                <div className = "settings_change_email_box">
                    <h3 className = "settings_change_email">Change email address</h3>
                </div>
                <div className = "settings_delete_account_box">
                    <h3 className = "settings_delete_account">Delete your account</h3>
                </div>
            </div>
            <div className = "settings_signout_box">
                    <h2 className = "settings_signout" onClick = {signout}>Signout</h2>
            </div>
        </div>
    )
}


export default Settings_page