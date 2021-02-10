import {useEffect, useState} from "react"
import "./Settings_page.css"
import Fire from "../config/Fire"
import firebase from "firebase"
import back_white_ico from "../images/back_white.svg"
import back_black_ico from "../images/back_black.svg"


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
    const [delete_account_button_style, set_delete_account_button_style] = useState("#f73f4f")
    const [style, set_style] = useState("")
    const [settings_panel_value, set_settings_panel_value] = useState("main")
    const [new_name, set_new_name] = useState("")
    const [new_email, set_new_email] = useState("")
    const [delete_password, set_delete_password] = useState("")
    const [back_icon_style, set_back_icon_style] = useState("")

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
            set_settings_change_username("settings_change_username_light") //css
            set_settings_change_email("settings_change_email_light")
            set_settings_delete_account("settings_delete_account_light")
            set_settings_signout("settings_signout_light")
            set_settings_title("settings_title_light")
            set_style("black") // style
            set_back_icon_style(back_black_ico) //set icon from import
        }
        if (theme === "dark") {
            set_settings_page_theme_text_display("Switch to light mode")
            set_settings_change_theme("settings_change_theme_dark")
            set_settings_change_username("settings_change_username_dark")
            set_settings_change_email("settings_change_email_dark")
            set_settings_delete_account("settings_delete_account_dark")
            set_settings_signout("settings_signout_dark")
            set_settings_title("settings_title_dark")
            set_style("white")
            set_back_icon_style(back_white_ico)
        }
    }

    const goback = () => {
        set_settings_panel_value("main")
    }
    const change_user_name_panel = () => {
        set_settings_panel_value("change_name")
    }
    const reset_email_panel = () => {
        set_settings_panel_value("reset_email")
    }
    const delete_account_panel = () => {
        set_settings_panel_value("delete_account")
    }

    const delete_account__button_selected_style = () => {
        set_delete_account_button_style("#f8051a")
    }
    const delete_account__button_unselected_style = () => {
        set_delete_account_button_style("#f73f4f")
    }

    const new_name_input_event = e => {
        set_new_name(e.target.value)
    }
    const new_name_input_submit_event = e => {
        if (e.key === "Enter") {
            if (user.displayName !== new_name) {
                Fire.auth().currentUser.updateProfile({
                    displayName: new_name
                })
                .then(() => {
                    window.alert("Your user name has been changed successfully !")
                    window.location.reload()
                })
                .catch((error) => {
                    window.alert("Error...")
                    //error
                })
            }
            else {
                window.alert("Your new name can't be the same as the old one !")
            }
        }
    }

    const new_email_input_event = e => {
        set_new_email(e.target.value)
    }
    const new_email_input_submit_event = e => {
        if (e.key === "Enter") {
            if (user.email !== new_email) {
                Fire.auth().currentUser.updateEmail(new_email)
                .then(() => {
                    window.alert("Your account email name has been changed successfully !")
                    window.location.reload()
                })
                .catch((error) => {
                    window.alert(error)
                })
            }
            else {
                window.alert("Your new name can't be the same as the old one !")
            }
        }
    }

    const delete_input_event = e => {
        set_delete_password(e.target.value)
    }
    const delete_account_submit_event = e => {
        if (e.key === "Enter") {
            const credential = firebase.auth.EmailAuthProvider.credential(Fire.auth().currentUser.email, delete_password)
            Fire.auth().currentUser.reauthenticateWithCredential(credential)
            .then(() => {
                Fire.database().ref("Users_data/" + user.uid + "/settings").remove().then(() => {
                    Fire.database().ref("Users_data/" + user.uid + "/email").remove().then(() => {
                        Fire.database().ref("Users_data/" + user.uid + "/username").remove().then(() => {
                            Fire.database().ref("Users_data/" + user.uid + "/email").remove().then(() => {
                                Fire.database().ref("Users_data/" + user.uid + "/verified").remove().then(() => {
                                    Fire.auth().currentUser.delete()
                                    .then(() => {
                                        window.alert("Your account has been deleted !")
                                        window.location.reload()
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }
    }
    const delete_account_submit_button_event = e => {
        const credential = firebase.auth.EmailAuthProvider.credential(Fire.auth().currentUser.email, delete_password)
        Fire.auth().currentUser.reauthenticateWithCredential(credential)
        .then(() => {
            Fire.database().ref("Users_data/" + user.uid + "/settings").remove().then(() => {
                Fire.database().ref("Users_data/" + user.uid + "/email").remove().then(() => {
                    Fire.database().ref("Users_data/" + user.uid + "/username").remove().then(() => {
                        Fire.database().ref("Users_data/" + user.uid + "/email").remove().then(() => {
                            Fire.database().ref("Users_data/" + user.uid + "/verified").remove().then(() => {
                                Fire.auth().currentUser.delete()
                                .then(() => {
                                    window.alert("Your account has been deleted !")
                                    window.location.reload()
                                })
                            })
                        })
                    })
                })
            })      
        })
    }

    const settings_panel = () => {
        if (settings_panel_value === "main") {
            return(
                <div className = {settings_page_browsersupport}>

                    <div className = "settings_title_box">
                        <h1 className = {settings_title}>Settings</h1>
                    </div>
                        <div className = "settings_box">
                            <div className = "settings_change_theme_box">
                                <h3 className = {settings_change_theme} onClick = {toggle_theme}>{settings_page_theme_text_display}</h3>
                            </div>
                            <div className = "settings_change_username_box">
                                <h3 className = {settings_change_username} onClick = {change_user_name_panel}>Change user name</h3>
                            </div>
                            <div className = "settings_change_email_box">
                                <h3 className = {settings_change_email} onClick = {reset_email_panel}>Change email address</h3>
                            </div>
                            <div className = "settings_delete_account_box">
                                <h3 className = {settings_delete_account} onClick = {delete_account_panel}>Delete your account</h3>
                            </div>
                        </div>
                    <div className = "settings_signout_box" onMouseEnter = {mouse_enter_signout_box} onMouseLeave = {mouse_leave_signout_box} style = {{backgroundColor: signout_box_style}}>
                        <h2 className = {settings_signout} onClick = {signout}>Signout</h2>
                    </div>
                </div>
            )
        }
        if (settings_panel_value === "change_name") {
            return(
                <div className = {settings_page_browsersupport}>
                    <div className = "settings_title_box">
                        <div className = "settings_back_icon_box">
                            <img className = "settings_back_icon" alt = "Back icon"  onClick = {goback} src = {back_icon_style} style = {{width: 25}}></img>
                        </div>
                        <h2 className = {settings_title} onClick = {goback}>Change name</h2>
                    </div>
                        <div className = "settings_box__change_name">
                            <div className = "settings_active_name_box">
                                <h3 className = "settings_active_name_text" style = {{color:style}}>Active name</h3>
                            </div>
                            <div className = "settings_old_name_box">
                                <h3 className = "settings_old_name_text" style = {{color:style}}>{user.displayName}</h3>
                            </div>
                            <hr className = "settings_change_name_separator" style = {{color:style}}></hr>
                            <div className = "settings_change_new_name_box">
                                <h3 className = "settings_change_new_name_text" style = {{color:style}}>New name</h3>
                            </div>
                            <div className = "settings_new_name_input_box">
                                <input className = "settings_new_name_input" placeholder = " Enter a new name" onChange = {new_name_input_event} value = {new_name} onKeyPress = {new_name_input_submit_event}></input>
                            </div>
                        </div>
                    <div className = "settings_new_old_name_text_box">
                        <div className = "settings_new_old_name_text_box_flexcl">
                            <h2 className = "settings_new_old_name_text" style = {{color:style}}>Your new name can't be the same as the old one !</h2>
                        </div>
                    </div>
                </div>
            )
        }
        if (settings_panel_value === "reset_email") {
            return(
                <div className = {settings_page_browsersupport}>
                    <div className = "settings_title_box">
                        <div className = "settings_back_icon_box">
                            <img className = "settings_back_icon" alt = "Back icon"  onClick = {goback} src = {back_icon_style} style = {{width: 25}}></img>
                        </div>
                        <h2 className = {settings_title} onClick = {goback}>Change email</h2>
                    </div>
                        <div className = "settings_box__change_email">
                            <div className = "settings_active_email_box">
                                <h3 className = "settings_active_email_text" style = {{color:style}}>Active email</h3>
                            </div>
                            <div className = "settings_old_email_box">
                                <h3 className = "settings_old_email_text" style = {{color:style}}>{user.email}</h3>
                            </div>
                            <hr className = "settings_change_email_separator" style = {{color:style}}></hr>
                            <div className = "settings_change_new_email_box">
                                <h3 className = "settings_change_new_email_text" style = {{color:style}}>New email</h3>
                            </div>
                            <div className = "settings_new_email_input_box">
                                <input className = "settings_new_email_input" placeholder = " Enter a new email" type = "email" onKeyPress = {new_email_input_submit_event} onChange = {new_email_input_event} value = {new_email}></input>
                            </div>
                        </div>
                    <div className = "settings_new_old_email_text_box">
                        <div className = "settings_new_old_email_text_box_flexcl">
                            <h2 className = "settings_new_old_email_text" style = {{color:style}}>Your new email can't be the same as the old one !</h2>
                        </div>
                    </div>
                </div>
            )
        }
        if (settings_panel_value === "delete_account") {
            return(
                <div className = {settings_page_browsersupport}>
                    <div className = "settings_title_box">
                        <div className = "settings_back_icon_box">
                            <img className = "settings_back_icon" alt = "Back icon"  onClick = {goback} src = {back_icon_style} style = {{width: 25}}></img>
                        </div>
                        <h2 className = {settings_title} onClick = {goback}>DELETE ACCOUNT</h2>
                    </div>
                        <div className = "settings_box__delete_account">
                            <div className = "settings_delete_account_condition_box">
                                <h3 className = "settings_delete_account_condition_text" style = {{color:style}}>You are about to delete your account! All your data will be deleted and you wont be able to recover it.</h3>
                            </div>
                            <hr className = "settings_delete_account_separator" style = {{color:style}}></hr>
                            <div className = "settings_delete_account_password_box">
                                <h3 className = "settings_delete_account_password_text" style = {{color:style}}>Type your password to confirm</h3>
                            </div>
                            <div className = "settings_delete_account_input_box">
                                <input className = "settings_delete_account_input" placeholder = " Password" type = "password" onChange = {delete_input_event} value = {delete_password} onKeyPress = {delete_account_submit_event}></input>
                            </div>
                        </div>
                        <div className = "settings_delete_account_button_box">
                            <button className = "settings_delete_account_button" style = {{backgroundColor: delete_account_button_style}} onMouseEnter = {delete_account__button_selected_style} onMouseLeave = {delete_account__button_unselected_style} onClick = {delete_account_submit_button_event}>Delete my account</button>
                        </div>
                </div>
            )
        }
    }


    useEffect(() => {
        browser()
        theme_text_display()
    }, [theme])


    return(
        <div className = "settings_panel_main_position">
            {settings_panel()}
        </div>
    )
}


export default Settings_page