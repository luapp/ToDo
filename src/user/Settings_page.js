import {useEffect, useState} from "react"
import "./Settings_page.css"
import Fire from "../config/Fire"


function Settings_page ({set_theme, theme, user}) {

    const [settings_page_browsersupport, set_settings_page_browsersupport] = useState("settings_page_mainbox")
    const [settings_page_theme_text_display, set_settings_page_theme_text_display] = useState("")
    const [settings_change_theme, set_settings_change_theme] = useState("")
    const [settings_change_username, set_settings_change_username] = useState("")
    const [settings_change_email, set_settings_change_email] = useState("")
    const [settings_delete_account, set_settings_delete_account] = useState("")
    const [settings_signout, set_settings_signout] = useState("")
    const [settings_title, set_settings_title] = useState("")
    const [signout_box_style, set_signout_box_style] = useState("transparent")


    const browser = () => {
        if (navigator.userAgent.indexOf("Firefox") > -1 === true) {
            if (theme === "light") {
                set_settings_page_browsersupport("settings_page_mainbox__MOZILLA_light")
            }
            else {
                set_settings_page_browsersupport("settings_page_mainbox__MOZILLA_dark")
            }
        }
        else {
            if (theme === "light") {
                set_settings_page_browsersupport("settings_page_mainbox_light")
            }
            else {
                set_settings_page_browsersupport("settings_page_mainbox_dark")
            }
        }
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

    const mouse_enter_signout_box = () => {
        set_signout_box_style("rgb(255, 0, 0, 0.1)")
    }
    const mouse_leave_signout_box = () => {
        set_signout_box_style("transparent")
    }

    const toggle_theme = () => {
        if (theme === "light") {
            Fire.database().ref("Users_data/" + user.uid + "/settings").update({
                theme: "dark"
            }, (error) => {
                if (error) {
                    //error
                }
                else {
                    set_theme("dark")
                }
            })
        }
        if (theme === "dark") {
            Fire.database().ref("Users_data/" + user.uid + "/settings").update({
                theme: "light"
            }, (error) => {
                if (error) {
                    //error
                }
                else {
                    set_theme("light")
                }
            })
        }
    }

    const theme_text_display = () => {
        if (theme === "light") {
            set_settings_page_theme_text_display("Switch to dark mode")
            set_settings_change_theme("settings_change_theme_light")
            set_settings_change_username("settings_change_username_light")
            set_settings_change_email("settings_change_email_light")
            set_settings_delete_account("settings_delete_account_light")
            set_settings_signout("settings_signout_light")
            set_settings_title("settings_title_light")
        }
        if (theme === "dark") {
            set_settings_page_theme_text_display("Switch to light mode")
            set_settings_change_theme("settings_change_theme_dark")
            set_settings_change_username("settings_change_username_dark")
            set_settings_change_email("settings_change_email_dark")
            set_settings_delete_account("settings_delete_account_dark")
            set_settings_signout("settings_signout_dark")
            set_settings_title("settings_title_dark")
        }
    }


    useEffect(() => {
        browser()
        theme_text_display()
    }, [theme])


    return(
        <div className = {settings_page_browsersupport}>
            <div className = "settings_title_box"><h1 className = {settings_title}>Settings</h1></div>
            <div className = "settings_box">
                <div className = "settings_change_theme_box">
                    <h3 className = {settings_change_theme} onClick = {toggle_theme}>{settings_page_theme_text_display}</h3>
                </div>
                <div className = "settings_change_username_box">
                    <h3 className = {settings_change_username}>Change user name</h3>
                </div>
                <div className = "settings_change_email_box">
                    <h3 className = {settings_change_email}>Change email address</h3>
                </div>
                <div className = "settings_delete_account_box">
                    <h3 className = {settings_delete_account}>Delete your account</h3>
                </div>
            </div>
            <div className = "settings_signout_box" onMouseEnter = {mouse_enter_signout_box} onMouseLeave = {mouse_leave_signout_box} style = {{backgroundColor: signout_box_style}}>
                    <h2 className = {settings_signout} onClick = {signout}>Signout</h2>
            </div>
        </div>
    )
}


export default Settings_page