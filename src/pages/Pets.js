import { useEffect } from "react"
import {usePetsContext} from "../hooks/usePetsContext"
import {useAuthContext} from "../hooks/useAuthContext"

//components
import PetDetails from "../components/PetDetails"
import PetForm from "../components/PetForm"

const Pets = ()=>{
    const { pets, dispatch} = usePetsContext()
    const {user} = useAuthContext()

    useEffect(()=> {
        const fetchPets = async ()=> {
            const response = await fetch('/api/pets', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_PETS', payload: json})
            }
        }
        if (user) {
            fetchPets()
        }

    }, [dispatch, user])

    return(
        <div className="home">
            <div className="pets">
                {pets && pets.map(pet => (
                    <PetDetails pet={pet} key={pet._id} />
                ))}
            </div>
            <PetForm />
        </div>
    )
}

export default Pets