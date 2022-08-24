import axios from 'axios'


export function getCountries(){
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001/countries")
        return dispatch({
            type: "GET_COUNTRIES",
            payload: json.data
        })
    }
}
export function filterCountriesContinent(payload){
    return{
        type: "FILTER_BY_CONTINENT",
        payload
    }
}
export function orderByName(payload){
    return{
        type: "ORDER_BY_NAME",
        payload
    }
}
export function orderByPopulation(payload){
    return{
        type: "ORDER_BY_POPULATION",
        payload
    }
}
export function getCountriesName(name){
    return async function (dispatch){
        try {
            var json = await axios.get("http://localhost:3001/countries?name=" + name)
            return dispatch({
                type: "GET_NAME_COUNTRY",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export function getActivities(){
    return async function (dispatch){
        var info = await axios.get("http://localhost:3001/touristActivity",{

        })
        return dispatch ({type: "GET_ACTIVITIES", payload: info.data})
    }
}

export function postActivity(payload){
    return async function(dispatch){
        const response = await axios.post("http://localhost:3001/touristActivity", payload)
        console.log(response)
        return response
    }
}