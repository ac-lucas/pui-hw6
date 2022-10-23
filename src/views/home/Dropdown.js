import React, { Component } from 'react';

//referenced from https://www.newline.co/@andreeamaco/react-dropdown-tutorial-for-beginners-create-a-dropdown-menu-from-scratch--9831d197

export function Dropdown(props) {
    return (
        <select id="glazing" name="glazing" action={props.action} onChange={props.onChange}>
            {props.children}
        </select>
    );
}

export function Option(props) {
    return (
        <option selected={props.selected}>
            {props.textContent}
        </option>
    );
}