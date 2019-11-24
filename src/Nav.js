import React from 'react';
import NavItem from './NavItem';
import './Nav.css';

const Nav = ({ activeButton, onButtonChange }) => {
    return (
        <nav className="nav">
        
            <NavItem
                activeButton={activeButton}
                onButtonChange={onButtonChange}
                buttonName="View by number of deaths"
            />

            <NavItem
                activeButton={activeButton}
                onButtonChange={onButtonChange}
                buttonName="View by location"
            />
        </nav>
    )
}

export default Nav;