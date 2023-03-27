import { useState } from "react"
import {usePetsContext} from "../hooks/usePetsContext"
import {useAuthContext} from "../hooks/useAuthContext"

const PetForm = ()=> {

    const {dispatch} = usePetsContext()
    const {user} = useAuthContext()

    const [petName, setPetName] = useState('')
    const [petBreed, setPetBreed] = useState('')
    const [petAge, setPetAge] = useState('')
    const [photo, setPhoto] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    
const handleSubmit = async (e) => {
    e.preventDefault()
    if(!user){
        setError('You must be logged in')
        return
    }

    const pet = {petName, petBreed, petAge, photo}

    const response = await fetch('/api/pets/', {
        method: 'POST',
        body: JSON.stringify(pet),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    })
    const json = await response.json()

    if (!response.ok) {
        setError(json.error)
        setEmptyFields(json.emptyFields)
    }
    if (response.ok){

        setPetName('')
        setPetBreed('')
        setPetAge('')
        setPhoto('')
        setError(null)
        setEmptyFields([])
        console.log('New pet added')
        dispatch({type: 'CREATE_PET', payload: json})
    }

}

    return(
        <form 
            className="create" onSubmit={handleSubmit}>
            <h3>Add a New Pet</h3>

            <label>Pet Name: </label>
            <input 
                type="text" 
                onChange={(e)=>setPetName(e.target.value)}
                value={petName}
                className={emptyFields.includes('petName') ? 'error' : ''}
            />

            <label>Pet Breed: </label>
            <input 
                type="text" 
                onChange={(e)=>setPetBreed(e.target.value)}
                value={petBreed}
                className={emptyFields.includes('petBreed') ? 'error' : ''}
            />
                       
            <label>Pet Age: </label>
            <input 
                type="number" 
                onChange={(e)=>setPetAge(e.target.value)}
                value={petAge}
                className={emptyFields.includes('petAge') ? 'error' : ''}
            />  
            <label>Photo: </label>
            <input 
                type="text" 
                onChange={(e)=>setPhoto(e.target.value)}
                value={photo}
                className={emptyFields.includes('photo') ? 'error' : ''}
            />
            
            <button>Submit</button>
            {error && <div className="error">{error}</div>}         
        </form>
    )
}

export default PetForm