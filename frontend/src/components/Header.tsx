import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => {
    return(
        <nav>
            <div>
                <Link to="/">Home</Link>
                <span> | </span>
                <Link to="/login/">Log In</Link>
            </div>
        </nav>
    )


}
export default Header