import React, {useState, useEffect} from "react"
import "./User_page.css"
import Fire from "../config/Fire"
import Task from "../task/Task"


function User_page ({user, user_name, set_user_name, set_Page_State}) {

    const [show_input, set_show_input] = useState(false)
    const [input_bar, set_input_bar] = useState("")
    const [task_data, set_task_data] = useState([])


    const input_event = e => {
        set_input_bar(e.target.value)
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

    const signout = () => {
        Fire.auth().signOut()
        .then(() => {
            window.alert("You has been signout !")
            window.location.reload()
        })
        .catch((error) => {
            var errorcode = error.code
            var errormessage = error.message
            console.log(errorcode + errormessage)
        })
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


    useEffect(() => {
        fetch_username()
        fetch_task()
    }, [])

    useEffect(() => {
        fetch_task()
    }, [task_data])


    return(
        <div className = "User_page-main-box">
            <div className = "User_page-name-box">
                <h1 className = "User_page-name">{user_name} tasks</h1>
                <div className = "User_page-signout-box"><h3 className = "User_page-signout" onClick = {signout}>Signout</h3></div>
            </div>
            <div className = "User_page-tasks-main-box">
                <div className = "User_page-task-list-box">

                    <div className = "User_page-add-task">
                        <div className = "User_page-add-task-title-flex">
                            <h2 className = "User_page-add-task-title" onClick = {input_toggole}>+ Add a task</h2>
                        </div>
                    </div>
                    {input()}
                </div>
            </div>
            <div className = "User_page-task-list-flexbox">
                <div className = "User_page-task-list-flexbox-cl">
                    {task_data.map(data => (
                        <Task data = {data[1].task_data} data_id = {data[0]} user = {user}/>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default User_page