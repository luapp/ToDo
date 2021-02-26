import React, {useState} from "react"
import "./Login.css"
import Fire from "../../config/Fire"


function Login ({set_user, set_Page_State}) {

    const [Login_email, set_Login_email] = useState("")
    const [Login_password, set_Login_password] = useState("")
    const [login_button_style, set_login_button_style] = useState("transparent")
    const [goback_button_style, set_goback_button_style] = useState("none")

    const mouse_enter_login_button = () => {
        set_login_button_style("rgba(250, 250, 250, 0.5)")
    }
    const mouse_leave_login_button = () => {
        set_login_button_style("transparent")
    }

    const mouse_enter_goback = () => {
        set_goback_button_style("solid")
    }
    const mouse_leave_goback = () => {
        set_goback_button_style("none")
    }

    const email_event = e => {
        set_Login_email(e.target.value)
    }
    const password_event = e => {
        set_Login_password(e.target.value)
    }

    const back_to_login__signup = () => {
        set_Page_State("Login&Signup")
    }

    const Firebase_login_auth_keypress = e => {
        if (e.key === "Enter") {
            Fire.auth().setPersistence("local")
            .then(() => {
                return Fire.auth().signInWithEmailAndPassword(Login_email, Login_password)
                .then((user) => {
                    set_user(user.user)
                    if (Fire.auth().currentUser.emailVerified === true) {
                        set_Page_State("user_page")
                    }
                    if (Fire.auth().currentUser.emailVerified === false) {
                        Fire.auth().currentUser.sendEmailVerification()
                        .then(() => {
                            set_Page_State("verify")
                        })
                        .catch((error) => {
                            //error
                        })
                    }
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    window.alert(errorCode + errorMessage)
                })
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                window.alert(errorCode + errorMessage) 
            })
        }
    }
    const Firebase_login_auth = () => {
        Fire.auth().setPersistence("local")
        .then(() => {
            return Fire.auth().signInWithEmailAndPassword(Login_email, Login_password)
            .then((user) => {
                set_user(user.user)
                if (Fire.auth().currentUser.emailVerified === true) {
                    set_Page_State("user_page")
                }
                if (Fire.auth().currentUser.emailVerified === false) {
                    Fire.auth().currentUser.sendEmailVerification()
                    .then(() => {
                        set_Page_State("verify")
                    })
                    .catch((error) => {
                        //error
                    })
                }
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                window.alert(errorCode)
            })
        })
        .catch((error) => {
            //var errorCode = error.code;
            //var errorMessage = error.message; 
        })
    }

    const password_reset = () => {
        Fire.auth().sendPasswordResetEmail(Login_email)
        .then(() => {
            window.alert("Reset link has been sent !")
        })
        .catch((error) => {
            window.alert("Error when sending reset link !")
        })
    }


    return(
        <div className = "main-box-Login">
            <div className = "Login-title-box"><h1 className = "Login-title">To Do Tasks Lists</h1></div>
            <div className = "Login-main-box">
                <div className = "Login-flex-box">
                    <div><h2 className = "Login-label">Login</h2></div>
                    <input className = "Login-email-input" placeholder = " E-mail" onChange = {email_event} value = {Login_email}></input>
                    <input type = "password" className = "Login-password-input" placeholder = " Password" onChange = {password_event} value = {Login_password} onKeyPress = {Firebase_login_auth_keypress}></input>
                    <div className = "Login_password_reset_box"><h5 className = "Login_password_reset_text" onClick = {password_reset   }>Fogot your password ?</h5></div>
                    <div className = "Login-box-label-confirm"><h2 className = "Login-label-confirm" onClick = {Firebase_login_auth} style = {{backgroundColor: login_button_style}} onMouseEnter = {mouse_enter_login_button} onMouseLeave = {mouse_leave_login_button}>Confirm login</h2></div>
                </div>
            </div>
            <div className = "Login_goback_box">
                <h1 className = "Login_goback" onClick = {back_to_login__signup} style = {{borderBottom: goback_button_style}} onMouseEnter = {mouse_enter_goback} onMouseLeave = {mouse_leave_goback}>Go back</h1>
            </div>
        </div>
    )
}


export default Login