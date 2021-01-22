import {useState, useEffect} from "react"
import "./Change_name_page.css"
import Fire from "../config/Fire"



function Change_name_page () {

    const [display_name, set_display_name] = useState("")

    const fetch_display_name = () => {
        set_display_name(Fire.auth().currentUser.displayName)
    }

    useEffect(() => {
        fetch_display_name()
    })
    return(
        <div className = "change_name_page_mainbox_light">
            <div>
                <h3>Change your name</h3>
            </div>
            <div>
                <div>
                    <h3>Old user name {display_name}</h3>
                </div>
                <div>
                    <h3>New user name:</h3>
                </div>
            </div>
        </div>
    )
}


export default Change_name_page