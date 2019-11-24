import React from 'react';
import './NavItem.css';

const NavItem = ({ activeButton, onButtonChange, buttonName }) => {

    // Method to style the active button by adding a 'selected' class
    // when the current button is the activeButton.
    const itemClass = (buttonName) => 
    `nav-button ${activeButton === buttonName ? 'selected'  : ''}`
    

    return (
        <button
            className={itemClass(buttonName)}
            onClick={ (e) => onButtonChange(buttonName)}>
            {buttonName}
        </button>
    )
    
}

export default NavItem;