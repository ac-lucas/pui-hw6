import { toHaveFocus } from '@testing-library/jest-dom/dist/matchers';
import React, { Component } from 'react';

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {

        return (
            
            <div className="cart-items">
                <img className="cart-image" src={this.props.cardImgURL} alt={this.props.cardAlt} />

                <div className="card-text">
                    {this.props.cardTitle} <br /> Glazing: {this.props.cardGlazing} <br /> Pack size: {this.props.cardPackSize}<br/>
                    <b>$ {this.props.cardPrice}</b>
                    <br/>
                    <br/>
                </div>

                <div className="remove" onClick={() => this.props.onRemove(this.props.cardIndex, this.props.cardPrice)}>
                    Remove
                </div>
            </div>
        )
    }
}

export default Cart