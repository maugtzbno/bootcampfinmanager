import React from "react";
import Table from "../Components/Table"
import FormPort from "../Components/FormPort"
import API from "../utils"

class Inversion extends React.Component{
    state = {
        selectPort: "PruebaPort",
        data: []
    }

    changePort = (value)=>{
        this.setState({
            selectPort: value
        })
        console.log("en inversion",this.state.selectPort);
    }


    render(){
        return(
            <div className="container">
             <FormPort selectPort={this.changePort}/>
             <br></br>
             <Table selectPort={this.state.selectPort}/>
         </div>
        )

    }
}

// function Inversion(){

//     return(
//         <div className="container">
//             <FormPort/>
//             <Table/>
//         </div>
//     )
// }

export default Inversion;