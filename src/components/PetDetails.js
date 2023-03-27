import { usePetsContext } from "../hooks/usePetsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const PetDetails = ({pet})=> {
    const {dispatch} = usePetsContext()
    const {user} = useAuthContext()
    
    const handleClick = async ()=>{
        if (!user){
            return
        }
        const response = await fetch('/api/pets/' + pet._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_PET', payload: json})
        }
    }
    return(
        <div className="pet-details">
            <h4>{pet.petName}</h4>
            <p><strong>Breed: </strong>{pet.petBreed}</p>
            <p><strong>Age: </strong>{pet.petAge}</p>
            <p><strong>Photo: </strong>{pet.photo}</p>
            <p>Created: {formatDistanceToNow(new Date(pet.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
            
        </div>
    )
}
export default PetDetails