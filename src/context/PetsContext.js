import { createContext, useReducer } from "react";

export const PetsContext = createContext()

export const petsReducer = (state, action)=> {
    switch (action.type) {
        case 'SET_PETS':
            return {
                pets: action.payload
            }
        case 'CREATE_PET':
            return {
                pets: [action.payload, ...state.pets]
            }
        case 'DELETE_PET':
            return {
                pets: state.pets.filter(w => w._id !== action.payload._id)
                }
        default:
            return state
    }
}

export const PetsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(petsReducer, {
        pets: null
    })


    return (
        <PetsContext.Provider value={{...state, dispatch}}>
            {children}
        </PetsContext.Provider>
    )
}