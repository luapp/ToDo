import React, {useState, useEffect} from "react"
import "./User_page.css"
import Fire from "../config/Fire"
import Task from "../task/Task"


function User_page ({user, user_name, set_user_name}) {

    const [show_input, set_show_input] = useState(false)
    const [input_bar, set_input_bar] = useState("")
    const [task_data, set_task_data] = useState([])


    const input_event = e => {
        set_input_bar(e.target.value)
    }

    const fetch_username = () => {
        Fire.database().ref("Users_data/" + user.user.uid + "/username").once("value").then((snapshot) => {
            set_user_name(snapshot.node_.value_)
        })
    }

    const fetch_task = () => {
        Fire.database().ref("Users_data/" + user.user.uid + "/tasks_list").once("value").then((snapshot) => {
            set_task_data(snapshot.val())
            snapshot.forEach((Task_childSnapshot) => {
                //set_task_data(Task_childSnapshot.val())
                // unused code !!!
            })
        })
    }

    const add_database = () => {

        if (input_bar !== "") {
            Fire.database().ref('Users_data/' + user.user.uid + "/tasks_list").push({
                task_data: input_bar
            })
        }
        else {
            window.alert("No task to add !")
        }
    }

    const input_true = () => {
        set_show_input(true)
    }

    const input = () => {
        if (show_input) {
            return(
                <div className = "User_page-task-input">
                    <input className = "task-input" placeholder = " Your new task" onChange = {input_event} value = {input_bar}></input>
                    <button className = "task-input-go-button" onClick = {add_database}>+Add</button>
                </div>
            )
        }
        else {
            return(
                <div></div>
            )
        }
    }

    const task_data_map = () => {
        if (task_data !== [] && task_data !== null) {
            return (
                <div className = "User_page-task-list-flexbox-cl">
                    {Object.entries(task_data).map(data => (
                        <Task data = {data[1].task_data} data_id = {data[0]} user = {user}/>
                    ))}
                </div>
            )
        }
        else {
            return(
                <div className = "User_page-task-list-flexbox-cl">
                </div>
            )
        }
    }

    useEffect(() => {
        fetch_username()
        fetch_task()
    }, [])

    useEffect(() => {
        fetch_task()
    }, [task_data])


    return(
        <div className = "User_page-main-box">
            <div className = "User_page-name-box"><h1 className = "User_page-name">{user_name} tasks</h1></div>
            <div className = "User_page-tasks-main-box">
                <div className = "User_page-task-list-box">

                    <div className = "User_page-add-task">
                        <div className = "User_page-add-task-title-flex">
                            <h2 className = "User_page-add-task-title" onClick = {input_true}>+ Add a task</h2>
                        </div>
                    </div>
                    {input()}
                </div>
            </div>
            <div className = "User_page-task-list-flexbox">
                {task_data_map()}
            </div>
        </div>
    )
}


export default User_page