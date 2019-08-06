import axios from "axios";

export default {
    //Get all stocks
    getStocks: function(id){
        return axios.get('/stocks/'+ id)
    }
}
