import {useEffect} from "react"
import "./Verify.css"
import Fire from "../../config/Fire"
import loading_image from "../../images/loading.svg"


function Verify ({user, set_Page_State}) {

    const verify_database_refresh = () => {
        Fire.database().ref("Users_data/" + user.uid + "/verified").on("value", (snapshot => {
            if (snapshot.val() === true) {
                set_Page_State("user_page")
            }
        }))
    }

    const verify_idtoken = () => {
        setInterval(() => {
            Fire.auth().onAuthStateChanged((user) => {
                if (user.emailVerified === false) {
                    Fire.auth().currentUser.reload()
                }
                else {
                    Fire.database().ref('Users_data/' + user.uid).update({
                        verified: true
                    })
                    .then(() => {
                        verify_database_refresh()
                    })
                }
            })
        }, 100)
    }


    useEffect (() => {
        verify_idtoken()
        verify_database_refresh()
    }, [])


    return(
        <div className = "Verify_background">
            <div className = "verify_title_box">
                <h1 className = "verify_title">Please check your email to activate your account</h1>
            </div>
            <div className = "verify_state_box">
                <div className = "verify_state_box_flex">
                    <h2 className = "verify_state">Waiting to verify your email address</h2>
                </div>
                <div className = "verify_state_spin_box">
                    <img src = {loading_image} className = "verify_state_spin" alt = "Loading..."></img>
                </div>
            </div>
        </div>
    )
}


export default Verify