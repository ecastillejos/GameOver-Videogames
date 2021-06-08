const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    created: [],
    platforms: [],
    genresToAdd: [],
    vgDetail: {},
    searched: [],
    status: false,
    filtered: []
}

function rootReducer(state = initialState, action) {

    switch (action.type) {
        case "GET_VIDEOGAMES":
            return {
                ...state,
                filtered: state.videogames
            }

        case "F_EXISTENTS":
            return {
                ...state,
                filtered: state.allVideogames.filter(i => !isNaN(i.id))
            }

        case "F_ADDED":
            return {
                ...state,
                filtered: state.allVideogames.filter(i => isNaN(i.id))
            }

        case "GET_GENRES":
            return {
                ...state,
                genres: action.payload
            }

        case "GET_GBGENRE":
            return {
                ...state,
                filtered: state.allVideogames.filter(i => i.genres.find(i => i.name === action.payload))
            }

        case "ADD_VG":
            return {
                ...state,
                created: action.payload
            }

        case "ADD_PLATFORM":
            return {
                ...state,
                platforms: [...state.platforms, action.payload]
            }

        case "DELETE_PLATFORM":
            return {
                ...state,
                platforms: state.platforms.filter(e => e !== action.payload)
            }

        case "UPDATE_GENRES":
            if (state.genresToAdd.includes(action.payload)) {
                return {
                    ...state,
                    genresToAdd: state.genresToAdd.filter(e => e !== action.payload)
                }
            } else {
                return {
                    ...state,
                    genresToAdd: [...state.genresToAdd, action.payload]
                }
            }

        case "VG_DETAIL":
            return {
                ...state,
                vgDetail: action.payload
            }

        case "SEARCH_VG":
            return {
                ...state,
                searched: action.payload
            }

        case "UPDATE_STATUS":
            return {
                ...state,
                status: action.payload
            }

        case "CLEAR_SEARCH":
            return {
                ...state,
                searched: []
            }

        case "GET_TOPG":
            return {
                ...state,
                allVideogames: action.payload,
                filtered: action.payload,
                videogames: action.payload
            }

        case "ORDER":
            return{
                ...state,
                filtered: action.payload
            }

        case "SET_CREATED":
            return{
                ...state,
                created:[]
            }

        case "SET_PLATFORMS":
            return{
                ...state,
                platforms:[]
            }

        default:
            return state;
    }
}

export default rootReducer;