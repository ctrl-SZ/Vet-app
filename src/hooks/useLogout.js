import { useAuthContext } from './useAuthContext'
import {usePetsContext} from './usePetsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: petsDispatch } = usePetsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    petsDispatch({type: 'SET_PETS', payload: null})
  }

  return { logout }
}