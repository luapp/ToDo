import React, {useState, useEffect} from "react"
import "./User_page.css"
import Fire from "../config/Fire"
import Task from "../task/Task"
import setting_ico from "../images/settings_full.svg"
import Settings_page from "./Settings_page"


function User_page ({user, user_name, set_user_name}) {

    const [show_input, set_show_input] = useState(false)
    const [input_bar, set_input_bar] = useState("")
    const [task_data, set_task_data] = useState([])
    const [theme, set_theme] = useState("light")
    const [display_settings, set_display_settings] = useState(false)
    const [setting_icon_style, set_setting_icon_style] = useState("User_page_setting_icon")
    const [User_page_add_task, set_User_page_add_task] = useState("")
    const [User_page_add_task_title, set_User_page_add_task_title] = useState("")
    const [task_input_go_button, set_task_input_go_button] = useState("")
    const [task_input, set_task_input] = useState("")


    const input_event = e => {
        set_input_bar(e.target.value)
    }

    const add_task_keypress_event = e => {
        if (e.key === "Enter") {
            add_database()
        }
    }

    const fetch_username = () => {
        Fire.database().ref("Users_data/" + user.uid + "/username").once("value").then((snapshot) => {
            set_user_name(snapshot.val())
        })
    }

    const fetch_task = () => {
        Fire.database().ref("Users_data/" + user.uid + "/tasks_list").once("value").then((snapshot) => {
            //console.log(snapshot.val())
            if (snapshot.val() !== null) {
                set_task_data(Object.entries(snapshot.val()))
            }
            else {
                set_task_data([])
            }
            
            snapshot.forEach((Task_childSnapshot) => {
                //set_task_data(Task_childSnapshot.val())
                // unused code !!!
            })
        })
    }

    const fetch_theme = () => {
        Fire.database().ref("Users_data/" + user.uid + "/settings/theme").once("value")
        .then((snapshot) => {
            set_theme(snapshot.val())
        })
    }

    const add_database = () => {

        if (input_bar !== "") {
            Fire.database().ref('Users_data/' + user.uid + "/tasks_list").push({
                task_data: input_bar
            })
            set_input_bar("")
            fetch_task()
        }
        else {
            window.alert("No task to add !")
        }
    }

    const settings = () => {
        if (!display_settings) {
            set_display_settings(true)
            set_setting_icon_style("User_page_setting_icon_open")
        }
        else {
            set_display_settings(false)
            set_setting_icon_style("User_page_setting_icon_close")
        }
    }
    const settings_false = () => {
        set_display_settings(false)
    }

    /*
    const close_settings = () => {
        set_display_settings(false)
        set_setting_icon_style("User_page_setting_icon_close")
    }
    */

    const setting_panel = () => {
        if (display_settings) {
            return(
                <div className = "settings_page">
                    <Settings_page set_theme = {set_theme} theme = {theme} user = {user}/>
                </div>
            )
        }
    }

    const input_toggole = () => {
        if (show_input === true) {
            set_show_input(false)
        }
        else {
            set_show_input(true)
        }
        //set_show_input(true)
    }

    const input = () => {
        if (show_input) {
            return(
                <div className = "User_page-task-input">
                    <input className = {task_input} placeholder = " Your new task" onChange = {input_event} value = {input_bar} onKeyPress = {add_task_keypress_event}></input>
                    <button className = {task_input_go_button} onClick = {add_database}>+Add</button>
                </div>
            )
        }
        else {
            return(
                <div></div>
            )
        }
    }
    const user_name_display = () => {
        if (user_name !== "") {
            return (
                <h1 className = "User_page-name">{user_name}'s tasks</h1>
            )
        }
        else {
            return (
                <h2 className = "User_page-name">Loading your data</h2>
            )
        }
    }

    const page_theme = () => {
        if (theme === "light") {
            set_User_page_add_task("User_page-add-task_light")
            set_User_page_add_task_title("User_page-add-task-title_light")
            set_task_input_go_button("task-input-go-button_light")
            set_task_input("task-input_light")
        }
        else {
            set_User_page_add_task("User_page-add-task_dark")
            set_User_page_add_task_title("User_page-add-task-title_dark")
            set_task_input_go_button("task-input-go-button_dark")
            set_task_input("task-input_dark")
        }
    }

    
    useEffect(() => {
        page_theme()
    }, [theme])

    useEffect(() => {
        fetch_username()
        fetch_task()
        fetch_theme()
    }, [])

    useEffect(() => {
        fetch_task()
    }, [task_data])


    return(
        <div className = "User_page-main-box">
            <div className = "User_page-name-box">
                {user_name_display()}
                <div className = "User_page-settings-box"><img className = {setting_icon_style} onClick = {settings} src = {setting_ico}></img></div>
            </div>
            {setting_panel()}
            <div className = "User_page-tasks-main-box">
                <div className = "User_page-task-list-box">
                    <div className = {User_page_add_task}>
                        <div className = "User_page-add-task-title-flex">
                            <h2 className = {User_page_add_task_title} onClick = {input_toggole}>+ Add a task</h2>
                        </div>
                    </div>
                    {input()}
                </div>
            </div>
            <div className = "User_page-task-list-flexbox" onClick = {settings_false}>
                <div className = "User_page-task-list-flexbox-cl">
                    {task_data.map(data => (
                        <Task data = {data[1].task_data} data_id = {data[0]} user = {user} theme = {theme}/>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default User_page