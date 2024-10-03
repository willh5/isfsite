// @ts-nocheck
import { createContext, ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const initialValue = {
authenticated: true,
setAuthenticated: () => {}
}

const AuthContextTwo = createContext(initialValue)

const AuthProviderTwo = ({children}: Props) => {
    const [ authenticated, setAuthenticated ] = useState(initialValue.authenticated)

    const navigate = useNavigate()

    return(
    <AuthContextTwo.Provider value={{authenticated, setAuthenticated}}>
        {children}
    </AuthContextTwo.Provider>

    )


}
export { AuthContextTwo, AuthProviderTwo }