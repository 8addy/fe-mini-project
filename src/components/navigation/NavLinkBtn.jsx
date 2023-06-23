import { Button } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import './navLinkBtn.css'

const NavLinkBtn = (props) => {
    const { label, path } = props;
  return (
    <NavLink
        to={path || "/"}
        className={({ isActive }) => `navlink ${ isActive ? "active" : "" }`}
    >
        <Button
            sx={{ my: 2, mr: 5, color: 'white', display: 'block' }}
            className='nav_link_btn'
        >
            {label}
        </Button>
    </NavLink>
  )
}

export default NavLinkBtn