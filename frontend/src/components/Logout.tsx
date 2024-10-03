// @ts-nocheck
import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext'

function Logout() {
    let {user, logoutUser} = useContext(AuthContext)



    return (
    <>
    {user && <button class="bg-red-700 text-xs hover:bg-red-800 text-stone-100 py-1 px-1 rounded inline-flex items-center" onClick={logoutUser}> Log out</button>}
    </>
    );
}

export default Logout;


