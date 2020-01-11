import React from "react"

const Caption = ({children}) => {

    return(
        <div style={{
            fontSize:"14px",
            textAlign:"center",
            color:"grey",
            marginTop:"-1rem",
            marginBottom:"2rem"}}>
            {children}
        </div>
    )
}

export default Caption