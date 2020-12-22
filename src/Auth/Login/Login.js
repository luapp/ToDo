import React, {useState} from "react"
import "./Login.css"
import Fire from "../../config/Fire"


function Login ({set_user, set_Page_State}) {

    const [Login_email, set_Login_email] = useState("")
    const [Login_password, set_Login_password] = useState("")

    const email_event = e => {
        set_Login_email(e.target.value)
    }
    const password_event = e => {
        set_Login_password(e.target.value)
    }

    const Firebase_login_auth = () => {
        Fire.auth().signInWithEmailAndPassword(Login_email, Login_password)
        .then((user) => {
            set_user(user)
            set_Page_State("user_page")
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert(errorCode + errorMessage)
        });
    }

    return(
        <div className = "main-box-Login">
            <div className = "Login-title-box"><h1 className = "Login-title">To Do Tasks Lists</h1></div>
            <div className = "Login-main-box">
                <div className = "Login-flex-box">
                    <div><h2 className = "Login-label">Login</h2></div>
                    <input className = "Login-email-input" placeholder = " E-mail" onChange = {email_event} value = {Login_email}></input>
                    <input type = "password" className = "Login-password-input" placeholder = " Password" onChange = {password_event} value = {Login_password}></input>
                    <div className = "Login-box-label-confirm"><h2 className = "Login-label-confirm" onClick = {Firebase_login_auth}>Confirm login</h2></div>
                </div>
            </div>
        </div>
    )
}


export default Login