import React, { Component } from "react";
import Form from "../Components/Form"
import ScrollableTabsButtonAuto from "../Components/AutomaticScrollButtons"

class Investigar extends Component {
    state = {
        selectTK: "PruebaTK"
    }

    changeTK = (value)=>{
        this.setState ({
            selectTK: value.substr(0,value.indexOf(' ')) ,
            selectName: value.substr(value.indexOf(' ')+1)
        })
    }

    render() {
        return (
            <div>
                <Form selectTK={this.changeTK}/>
                <br></br>
                <ScrollableTabsButtonAuto selectTK={this.state.selectTK} selectName={this.state.selectName} />
            </div>
        );
    }
}

export default Investigar;
