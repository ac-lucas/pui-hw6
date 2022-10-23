import React, { Component } from 'react';

// referenced from https://bobbyhadz.com/blog/react-sort-array-of-objects
// referenced from https://stackoverflow.com/questions/48764203/how-to-sort-list-of-react-components-based-on-different-properties


    export function Sort (props , by) {
        if (props.by == "Name") {
            return React.Children.toArray(props.children).sort((a,b) => a.props.cardTitle > b.props.cardTitle ? 1 : -1,);
        }
        else if (props.by == "Base Price") {
            return React.Children.toArray(props.children).sort((a,b) => a.props.cardPrice > b.props.cardPrice ? 1 : -1,);

        }
        return React.Children.toArray(props.children).sort()
    }