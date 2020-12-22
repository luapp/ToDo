import React from "react"
import "./Task.css"
import Fire from "../config/Fire"


function Task ({data, data_id, user}) {

    const delete_task = () => {
        Fire.database().ref("Users_data/" + user.user.uid + "/tasks_list/" + data_id).remove()
    }
    return(
        <div className = "Task-main-box">
            <div className = "Task-box"><h3 className = "Task-text">{data}</h3></div>
            <div className = "Task-remove-box"><h3 className = "Task-remove-text" onClick = {delete_task}>Remove</h3></div>
        </div>
    )
}


export default Task