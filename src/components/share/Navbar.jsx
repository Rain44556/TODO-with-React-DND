import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const {user, logOutUser} = useContext(AuthContext);
    const navLinks = <>
      <NavLink className="px-6" to="/">Home</NavLink>
    { user && <>
      <NavLink className="px-6" to="/addTask">Add Task</NavLink>
      </>
    }
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost text-xl">daisyUI</Link>
        </div>
        <div className="navbar-center lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navLinks}
          </ul>
        </div>
        <div className="navbar-end">
            {user && user?.email ?
            (
                <ul
                tabIndex={0}
                className="">
                  <a className="justify-between p-2 mb-2">
                    {user?.displayName}
                  </a>
                
                <button onClick={logOutUser} className="btn">Logout</button>
              </ul>
            ) :
            <Link to="/googleLogin" className="btn">Google sign-in</Link>
            }
          
        </div>
      </div>
    );
};

export default Navbar;