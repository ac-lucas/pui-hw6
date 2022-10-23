import { toHaveFocus } from '@testing-library/jest-dom/dist/matchers';
import React, { Component } from 'react';
import { Dropdown, Option } from "./Dropdown";

class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {
            updatedCardPrice: this.props.cardPrice,
            newPrice: 0,
            glazingPrice: 0,
            multiplier: 1,
            cardTotalPrice: 0,
            glazingName: "Keep original",
            itemPackSize: 1,
            showCart: false,
            checked: false,
            itemValue1: "1",
            itemValue2: "3",
            itemValue3: "6",
            itemValue4: "12",
        }
    }


    handlePriceChange = (event) => {

        if (event.target.value === "Vanilla milk") {
            this.state.glazingPrice = ".5"
            this.state.glazingName = "Vanilla milk"
        }
        else if (event.target.value === "Double chocolate") {
            this.state.glazingPrice = "1.5"
            this.state.glazingName = "Double chocolate"
        }
        else if (event.target.value === "Keep original") {
            this.state.glazingPrice = "0"
            this.state.glazingName = "Keep original"
        }
        else if (event.target.value === "Sugar milk") {
            this.state.glazingPrice = "0"
            this.state.glazingName = "Sugar milk"
        }


        if (event.target.value === this.state.itemValue2) {
            this.state.multiplier = 3;
            this.state.itemPackSize = 3
        }
        else if (event.target.value === this.state.itemValue3) {
            this.state.multiplier = 5;
            this.state.itemPackSize = 6
        }
        else if (event.target.value === this.state.itemValue4) {
            this.state.multiplier = 10;
            this.state.itemPackSize = 12
        }
        else if (event.target.value === this.state.itemValue1) {
            this.state.multiplier = 1;
            this.state.itemPackSize = 1
        }

        this.state.newPrice = +this.state.glazingPrice + +this.props.cardPrice;
        this.state.newPrice = +this.state.newPrice * +this.state.multiplier;
        this.state.newPrice = this.state.newPrice.toFixed(2);
        this.setState({ updatedCardPrice: this.state.newPrice });
    };

    handleAddToCart = (event) => {
        this.state.showCart = true
        this.props.priceCallBack(this.state.updatedCardPrice, this.props.cardTitle, this.state.glazingName, this.state.itemPackSize, this.state.showCart)
        this.props.addToCartCallBack(this.state.updatedCardPrice, this.state.glazingName, this.state.itemPackSize, this.props.cardIdx)
        this.state.showCart = false
    };

    render() {

        return (
            
            <div className="cards column">
                <img className="card-image" src={this.props.cardImgURL} alt={this.props.cardAlt} />

                <div className="card-title">
                    <h2>{this.props.cardTitle}</h2>
                </div>

                <div className="card-glazing">
                    <label htmlFor="glazing1">Glazing:</label>
                    <Dropdown
                        action="/"
                        onChange={this.handlePriceChange}
                    >
                        <Option textContent="Keep original" />
                        <Option textContent="Sugar milk" />
                        <Option textContent="Vanilla milk" />
                        <Option textContent="Double chocolate" />
                    </Dropdown>
                </div>

                <div className="card-size">
                    <div className="card-size-title">
                        <p>Pack size: </p>
                    </div>
                    <div className="card-size-squares">

                        {/*referenced from https://codepen.io/w3programmings/pen/zzRKpy */}
                        <form className="boxed" onChange={this.handlePriceChange}>
                            <input type="radio" id={this.props.id1} name="card-size" value="1"/>
                            <label htmlFor={this.props.id1} style={{backgroundColor: this.state.itemPackSize === 1 ? "#c7c7c7" : "white"}}>1</label>

                            <input type="radio" id={this.props.id2} name="card-size" value="3"/>
                            <label htmlFor={this.props.id2} style={{backgroundColor: this.state.itemPackSize === 3 ? "#c7c7c7" : "white"}}>3</label>

                            <input type="radio" id={this.props.id3} name="card-size" value="6"/>
                            <label htmlFor={this.props.id3} style={{backgroundColor: this.state.itemPackSize === 6 ? "#c7c7c7" : "white"}}>6</label>

                            <input type="radio" id={this.props.id4} name="card-size" value="12"/>
                            <label htmlFor={this.props.id4} style={{backgroundColor: this.state.itemPackSize === 12 ? "#c7c7c7" : "white"}}>12</label>
                        </form>
                    </div>
                </div>

                <div className="card-price">
                    <div className="card-price-left">
                        <p>{this.state.updatedCardPrice}</p>
                    </div>
                    <div className="card-price-right">
                        <button type="button" onClick={this.handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card