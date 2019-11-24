import React from 'react';
import NavItem from './NavItem';
import './Nav.css';

const Nav = ({ activeButton, onButtonChange }) => {
    return (
        <nav className="nav">
        
            <NavItem
                activeButton={activeButton}
                onButtonChange={onButtonChange}
                buttonName="View bar chart"
            />

            <NavItem
                activeButton={activeButton}
                onButtonChange={onButtonChange}
                buttonName="View map"
            />
        </nav>
    )
}

export default Nav;