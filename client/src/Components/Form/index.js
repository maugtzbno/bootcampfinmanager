import React, { Component } from 'react';
import API from '../../utils';

class Form extends Component {
    //Setting the component's initial state
    state = {
        tickers: "",
        options: []
    };

    handleInputChange = event => {
        //Getting the value and name of the input which trigerred the change
        const { name, value } = event.target;

        if (value.length > 1) {
            API.getStocks(value).then(res => {
                console.log(res.data.bestMatches)
                this.setState({
                    options: res.data.bestMatches
                })
            }
            );
        }

        //Updating the input's state
        this.setState({
            tickers: value
        });
    };

    handleSelectChange = event =>{
        console.log("dentro de handle select", event.target.selectedOptions[0].text);
        this.props.selectTK(event.target.selectedOptions[0].text);
    }

    render() {
        return (
            <div>
                <form>
                    <input
                        value={this.state.tickers}
                        name="ticker"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="Ticker"
                    />
                    <br></br>
                    <br></br>
                    <select onChange={this.handleSelectChange}>
                        {
                            this.state.options.map((item)=>
                                <option 
                                value={item["1. symbol"]}
                                name={item["2. name"]}
                                >
                                    {item["1. symbol"]} {item["2. name"]}    
                                </option>
                            )
                        }
                    </select>
                </form>
            </div>
        );
    }
}

export default Form;