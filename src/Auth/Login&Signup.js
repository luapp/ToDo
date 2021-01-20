import React, {useEffect} from "react"
import "./Login&Signup.css"
import Fire from "../config/Fire"


function Login__Signup ({set_Page_State, set_user, user}) {

    const set_Page_State__login = () => {
        set_Page_State("login_page")
    }
    
    const set_Page_State__signup = () => {
        set_Page_State("signup_page")
    }

    const set_Page_State__user_page = () => {
        set_Page_State("user_page")
    }

    const set_Page_State__verify_page = () => {
        set_Page_State("verify")
    }

    const Auth_checking = () => {
        Fire.auth().onAuthStateChanged((user) => {
            if (user) {
                set_user(user)
            }
        })
        if (user.emailVerified === true) {
            set_Page_State__user_page()
        }
        if (user.emailVerified === false) {
            Fire.auth().currentUser.sendEmailVerification()
            .then(() => {
                set_Page_State__verify_page()
            })
            .catch((error) => {
                //error
            })
        }
    }


    useEffect (() => {
        Auth_checking()
    }, [user])

    return(
        <div className = "main-box-Login__Signup">
            <div className = "Login__Signup-title-box"><h1 className = "Login__Signup-title">To Do Tasks Lists</h1></div>
            <div className = "Login__Signup-main-box">
                <div className = "Login__Signup-selection-box">
                    <button className = "Login__Signup-login" onClick = {set_Page_State__login}>Login</button>
                    <div className = "Login__Signup-ortext-box"><h2 className = "Login__Signup-ortext">Or</h2></div>
                    <button className = "Login__Signup-signup" onClick = {set_Page_State__signup}>Signup</button>
                </div>
            </div>
        </div>
    )
}



export default Login__Signup