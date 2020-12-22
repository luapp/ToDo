import React from "react"
import "./Login&Signup.css"


function Login__Signup ({set_Page_State}) {

    const set_Page_State__login = () => {
        set_Page_State("login_page")
    }
    
    const set_Page_State__signup = () => {
        set_Page_State("signup_page")
    }


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