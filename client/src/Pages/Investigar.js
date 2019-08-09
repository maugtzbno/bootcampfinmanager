import React, { Component } from "react";
// import API from "../utils";
// import Container from "../Utilities/Container";
// import SearchForm from "../Utilities/SearchForm";
// import SearchResults from "../Utilities/SearchResults";
// import Alert from "../Utilities/Alert";
import Form from "../Components/Form"
import ScrollableTabsButtonAuto from "../Components/AutomaticScrollButtons"

class Investigar extends Component {

    render() {
        return (
            <div>
                <Form />
                <ScrollableTabsButtonAuto />
            </div>
        );
    }
}

export default Investigar;
