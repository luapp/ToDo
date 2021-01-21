import {useEffect, useState} from "react"
import "./Task.css"
import Fire from "../config/Fire"


function Task ({data, data_id, user, theme}) {

    const [Task_box, set_Task_box] = useState("")  
    const [Task_text, set_Task_text] = useState("")
    const [Task_remove_box, set_Task_remove_box] = useState("")
    const [Task_remove_text, set_Task_remove_text] = useState("")

    const delete_task = () => {
        Fire.database().ref("Users_data/" + user.uid + "/tasks_list/" + data_id).remove()
    }

    const page_theme = () => {
        if (theme === "light") {
            set_Task_box("Task-box_light")
            set_Task_text("Task-text_light")
            set_Task_remove_box("Task-remove-box_light")
            set_Task_remove_text("Task-remove-text_light")
        }
        else {
            set_Task_box("Task-box_dark")
            set_Task_text("Task-text_dark")
            set_Task_remove_box("Task-remove-box_dark")
            set_Task_remove_text("Task-remove-text_dark")
        }
    }

    
    useEffect(() => {
        page_theme()
    }, [theme])


    return(
        <div className = "Task-main-box">
            <div className = {Task_box}><h3 className = {Task_text}>{data}</h3></div>
            <div className = {Task_remove_box}><h3 className = {Task_remove_text} onClick = {delete_task}>Remove</h3></div>
        </div>
    )
}


export default Task