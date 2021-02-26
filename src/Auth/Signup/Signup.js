import React, {useState} from "react"
import "./Signup.css"
import Fire from "../../config/Fire"


function Signup ({set_user, set_Page_State, user_name, set_user_name}) {

    const [Signup_email, set_Signup_email] = useState("")
    const [Signup_password, set_Signup_password] = useState("")
    const [signup_button_style, set_signup_button_style] = useState("transparent")
    const [goback_button_style, set_goback_button_style] = useState("none")

    const email_event = e => {
        set_Signup_email(e.target.value)
    }
    const password_event = e => {
        set_Signup_password(e.target.value)
    }
    const user_name_event = e => {
        set_user_name(e.target.value)
    }

    const back_to_login__signup = () => {
        set_Page_State("Login&Signup")
    }

    const Firebase_Signup_auth_keypress = e => {
        if (e.key === "Enter") {
            if (user_name !== "") {
                Fire.auth().createUserWithEmailAndPassword(Signup_email, Signup_password)
                .then((user) => {
    
                    Fire.database().ref('Users_data/' + user.user.uid).set({
                        username: user_name,
                        email: user.user.email,
                        verified: false
                    }, (error) => {
                        if (error) {
                            console.log(error)
                        }
                        else {
                            Fire.database().ref("Users_data/" + user.user.uid + "/settings").set({
                                theme: "light"
                            }, (error) => {
                                if (error) {
                                    console.log(error)
                                }
                                else {
                                    set_user(user.user)
                                    user.user.sendEmailVerification()
                                    .then(() => {
                                        set_Page_State("verify")
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                    })
                                }
                            })
                        }
                    })
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
    }

    const Firebase_Signup_auth = () => {
        if (user_name !== "") {
            Fire.auth().createUserWithEmailAndPassword(Signup_email, Signup_password)
            .then((user) => {

                Fire.database().ref('Users_data/' + user.user.uid).set({
                    username: user_name,
                    email: user.user.email,
                    verified: false
                }, (error) => {
                    if (error) {
                        console.log(error)
                    }
                    else {
                        Fire.database().ref("Users_data/" + user.user.uid + "/settings").set({
                            theme: "light"
                        }, (error) => {
                            if (error) {
                                console.log(error)
                            }
                            else {
                                set_user(user.user)
                                user.user.sendEmailVerification()
                                .then(() => {
                                    set_Page_State("verify")
                                })
                                .catch((error) => {
                                    console.log(error)
                                })
                            }
                        })
                    }
                })
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

    const mouse_enter_signup_button = () => {
        set_signup_button_style("rgba(250, 250, 250, 0.5)")
    }
    const mouse_leave_signup_button = () => {
        set_signup_button_style("transparent")
    }


    const mouse_enter_goback = () => {
        set_goback_button_style("solid")
    }
    const mouse_leave_goback = () => {
        set_goback_button_style("none")
    }


    return(
        <div className = "main-box-Signup">
            <div className = "Signup-title-box"><h1 className = "Signup-title">To Do Tasks Lists</h1></div>
            <div className = "Signup-main-box">
                <div className = "Signup-flex-box">
                    <div><h2 className = "Signup-label">Signup</h2></div>
                    <input className = "Signup-name-input" placeholder = " Name" onChange = {user_name_event} value = {user_name}></input>
                    <input className = "Signup-email-input" placeholder = " E-mail" onChange = {email_event} value = {Signup_email}></input>
                    <input className = "Signup-password-input" type = "password" placeholder = " Password" onChange = {password_event} value = {Signup_password} onKeyPress = {Firebase_Signup_auth_keypress}></input>
                    <div className = "Signup-box-label-confirm"><h2 className = "Signup-label-confirm" onClick = {Firebase_Signup_auth} style = {{backgroundColor: signup_button_style}} onMouseEnter = {mouse_enter_signup_button} onMouseLeave = {mouse_leave_signup_button}>Confirm Signup</h2></div>
                </div>
            </div>
            <div className = "Signup_goback_box">
                <h1 className = "Signup_goback" onClick = {back_to_login__signup} style = {{borderBottom: goback_button_style}} onMouseEnter = {mouse_enter_goback} onMouseLeave = {mouse_leave_goback}>Go back</h1>
            </div>
        </div>
    )
}


export default Signup