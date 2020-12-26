import React, {useState} from "react"
import "./Signup.css"
import Fire from "../../config/Fire"


function Signup ({set_user, set_Page_State, user_name, set_user_name}) {

    const [Signup_email, set_Signup_email] = useState("")
    const [Signup_password, set_Signup_password] = useState("")

    const email_event = e => {
        set_Signup_email(e.target.value)
    }
    const password_event = e => {
        set_Signup_password(e.target.value)
    }
    const user_name_event = e => {
        set_user_name(e.target.value)
    }

    const Firebase_Signup_auth = () => {
        if (user_name !== "") {
            Fire.auth().createUserWithEmailAndPassword(Signup_email, Signup_password)
            .then((user) => {
                Fire.database().ref('Users_data/' + user.user.uid).set({
                    username: user_name,
                    email: user.user.email
                }, (error) => {
                    if (error) {
                        console.log(error)
                    }
                    else {
                        set_user(user)
                        set_Page_State("user_page")
                    }
                })
                set_user(user)
                //set_Page_State("user_page")
            })
            .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode + errorMessage)
            });
        }
        else {
            window.alert("Please type your name")
        }
        
    }


    return(
        <div className = "main-box-Signup">
            <div className = "Signup-title-box"><h1 className = "Signup-title">To Do Tasks Lists</h1></div>
            <div className = "Signup-main-box">
                <div className = "Signup-flex-box">
                    <div><h2 className = "Signup-label">Signup</h2></div>
                    <input className = "Signup-name-input" placeholder = " Name" onChange = {user_name_event} value = {user_name}></input>
                    <input className = "Signup-email-input" placeholder = " E-mail" onChange = {email_event} value = {Signup_email}></input>
                    <input className = "Signup-password-input" type = "password" placeholder = " Password" onChange = {password_event} value = {Signup_password}></input>
                    <div className = "Signup-box-label-confirm"><h2 className = "Signup-label-confirm" onClick = {Firebase_Signup_auth}>Confirm Signup</h2></div>
                </div>
            </div>
        </div>
    )
}


export default Signup