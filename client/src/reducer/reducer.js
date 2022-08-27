

const initialState = {
    countries: [],
    allCountries:[],
    activities:[],
    detail:[]
}


function rootReducer (state = initialState, action){
    switch(action.type){
        case "GET_COUNTRIES":
            return{
                ...state,
                countries: action.payload,
                allCountries:action.payload
            }
        case "FILTER_BY_CONTINENT":
                const allCountries = state.allCountries
                const continentFilter = action.payload === "All continents" ? allCountries : allCountries.filter(e => e.continent === action.payload)
                return{
                    ...state,
                    countries: continentFilter
            }
        case "ORDER_BY_NAME":
                let sortedArr = action.payload === 'Aasc' ?
                state.countries.sort(function (a, b){
                    if(a.name > b.name){
                        return 1
                    }
                    if (b.name > a.name){
                        return -1
                    }
                    return 0
                }) :
                state.countries.sort(function (a, b){
                    if (a.name > b.name){
                        return -1
                    }
                    if (b.name > a.name){
                        return 1
                    }
                    return 0
                })
                return{
                    ...state,
                    countries: sortedArr
            }
        case "ORDER_BY_POPULATION":
                let sortedPop = action.payload === 'Pasc' ?
                state.countries.sort(function (a, b){
                    if(a.population > b.population){
                        return 1
                    }
                    if (b.population > a.population){
                        return -1
                    }
                    return 0
                }) :
                state.countries.sort(function (a, b){
                    if (a.population > b.population){
                        return -1
                    }
                    if (b.population > a.population){
                        return 1
                    }
                    return 0
                })
                return{
                    ...state,
                    countries: sortedPop
            }
        case "GET_NAME_COUNTRY":
                    return{
                        ...state,
                        countries:action.payload
            }
        case "GET_ACTIVITIES":
                        return{
                        ...state,
                        activities: action.payload
            }
        case "POST_ACTIVITY":
                    return {
                        ...state
            }
        case "GET_DETAILS":
            return{
                ...state,
                detail: action.payload
            }
            default:
                return state
    }
}

export default rootReducer