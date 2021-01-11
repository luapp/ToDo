import React, {useState} from 'react';
import Login__Signup from "./Auth/Login&Signup"
import Login from "./Auth/Login/Login"
import Signup from "./Auth/Signup/Signup"
import User_page from "./user/User_page"
import './App.css';

function App() {

  // Login&Signup is the landing page...

  const [Page_State, set_Page_State] = useState("Login&Signup")
  const [user, set_user] = useState("")
  const [user_name, set_user_name] = useState("")

  if (Page_State === "Login&Signup") {
    return(
      <div className = "App">
        <Login__Signup set_Page_State = {set_Page_State} set_user = {set_user} user = {user}/>
      </div>
    )
  }
  if (Page_State === "login_page") {
    return(
      <div className = "App">
        <Login set_user = {set_user} set_Page_State = {set_Page_State}/>
      </div>
    )
  }
  if (Page_State === "signup_page") {
    return(
      <div className = "App">
        <Signup set_user = {set_user} set_Page_State = {set_Page_State} user_name = {user_name} set_user_name = {set_user_name}/>
      </div>
    )
  }
  if (Page_State === "user_page") {
    return(
      <div className = "App">
        <User_page user = {user} user_name = {user_name} set_user_name = {set_user_name} set_Page_State = {set_Page_State}/>
      </div>
    )
  }
}

export default App;
