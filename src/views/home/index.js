import React, { Component } from 'react';
import './index.css';
import Card from './Card';
import Navbar from './Navbar';
import { Dropdown, Option } from "./Dropdown";
import { Sort } from './Sort';
import Cart from './Cart'

const { search } = window.location;
const query = new URLSearchParams(search).get('s');

class Homepage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cardData: [
                {
                    cardImgURL: "assets/original-cinnamon-roll.jpg",
                    cardAlt: "original cinnamon roll",
                    cardTitle: "Original cinnamon roll",
                    cardPrice: "2.49",
                    id1: "id1",
                    id2: "id2",
                    id3: "id3",
                    id4: "id4",
                    index: 0
                },
                {
                    cardImgURL: "assets/apple-cinnamon-roll.jpg",
                    cardAlt: "apple cinnamon roll",
                    cardTitle: "Apple cinnamon roll",
                    cardPrice: "3.49",
                    id1: "id5",
                    id2: "id6",
                    id3: "id7",
                    id4: "id8",
                    index: 1
                },
                {
                    cardImgURL: "assets/raisin-cinnamon-roll.jpg",
                    cardAlt: "raisin cinnamon roll",
                    cardTitle: "Raisin cinnamon roll",
                    cardPrice: "2.99",
                    id1: "id9",
                    id2: "id10",
                    id3: "id11",
                    id4: "id12",
                    index: 2
                },
                {
                    cardImgURL: "assets/walnut-cinnamon-roll.jpg",
                    cardAlt: "walnut cinnamon roll",
                    cardTitle: "Walnut cinnamon roll",
                    cardPrice: "3.49",
                    id1: "id13",
                    id2: "id14",
                    id3: "id15",
                    id4: "id16",
                    index: 3
                },
                {
                    cardImgURL: "assets/double-chocolate-cinnamon-roll.jpg",
                    cardAlt: "double chocolate cinnamon roll",
                    cardTitle: "Double-chocolate cinnamon roll",
                    cardPrice: "3.99",
                    id1: "id17",
                    id2: "id18",
                    id3: "id19",
                    id4: "id20",
                    index: 4
                },
                {
                    cardImgURL: "assets/strawberry-cinnamon-roll.jpg",
                    cardAlt: "strawberry cinnamon roll",
                    cardTitle: "Strawberry cinnamon roll",
                    cardPrice: "3.99",
                    id1: "id21",
                    id2: "id22",
                    id3: "id23",
                    id4: "id24",
                    index: 5
                }
            ],

            cartAddedData: [

            ],

            totalPrice: 0,
            totalItems: 0,
            tempTitle: "",
            tempGlazing: "Keep original",
            tempPack: "1",
            itemCost: "",
            clicked: false,
            searchCategory: null,
            count: 0,
            sort: "",
            display: false,
            idxToAdd: 0
        }
        this.sort = this.handleSortChange.bind(this)
    }

    pluralize() {
        if (this.state.totalItems != 1) {
            return "items"
        }
        else {
            return "item"
        }
    }

    handleCart = (priceData, title, glazing, pack, popup) => {
        this.state.totalItems = +this.state.totalItems + +1
        this.setState({
            totalPrice: (+this.state.totalPrice + +priceData).toFixed(2),
            totalItems: +this.state.totalItems, tempTitle: title,
            tempGlazing: glazing, tempPack: pack, itemCost: priceData,
            clicked: popup
        })
    }

    searchButtonHandler = (searchQuery) => {
        this.state.searchCategory = searchQuery
    }

    handleCount() {
        if (this.state.count == 0) {
            return (
                "No Match!"
            )
        }
    }

    handleSortChange = (event) => {
        var tempSort = event.target.value
        this.setState({
            sort: tempSort
        })
    };

    handleAddToCart = (displayCart) => {
        this.setState({
            display: displayCart
        })

    }

    addCardToCart = (price, glazing, packSize, idx) => {
        this.state.idxToAdd = idx
        let newCartItem = {
            cardImgURL: this.state.cardData[this.state.idxToAdd].cardImgURL,
            cardAlt: this.state.cardData[this.state.idxToAdd].cardAlt,
            cardTitle: this.state.cardData[this.state.idxToAdd].cardTitle,
            cardPrice: price,
            cardGlazing: glazing,
            cardPackSize: packSize
        }

        let newCardData = this.state.cartAddedData
        newCardData.push(newCartItem)
        this.setState(prevState => ({
            ...prevState,
            cartAddedData: newCardData
        }))
    }

    getListLength() {
        if (this.state.cartAddedData.length === 0) {
            return <div>
                <p>The cart is empty!</p>
            </div>
        }
    }

    removeHandler = (idxToRemove, price, items) => {
        const newCardData = this.state.cartAddedData;
        newCardData.splice(idxToRemove, 1);
        this.setState(prevState => ({
            ...prevState,
            cartAddedData: newCardData,
            totalPrice: +this.state.totalPrice - +price,
            totalItems: +this.state.totalItems - +1
        }))
    }

    render() {
        let cartClass = 'cart';

        if (this.state.display) {
            cartClass += ' expanded';
        }

        return (
            <div>
                <Navbar
                    price={this.state.totalPrice}
                    items={this.state.totalItems}
                    title={this.state.tempTitle}
                    glazing={this.state.tempGlazing}
                    pack={this.state.tempPack}
                    cost={this.state.itemCost}
                    cardCallBack={this.handleAddToCart}

                />

                <div className={cartClass} style={{ display: this.state.display ? "block" : "none" }}>
                    <hr className="divider" />
                    <div className="cart-info">
                        <p className="shopping-cart">Shopping Cart ({this.state.totalItems} {this.pluralize()})</p>
                        <p className="total">Total: $ {this.state.totalPrice}</p>
                    </div>
                    <div className="cart-items" style={{ display: "flex", flexDirection: 'row' }}>
                        {this.state.cartAddedData.map(
                            (cart, idx) => {
                                return <Cart
                                    key={idx}
                                    cardIndex={idx}
                                    cardImgURL={cart.cardImgURL}
                                    cardAlt={cart.cardAlt}
                                    cardTitle={cart.cardTitle}
                                    cardPrice={cart.cardPrice}
                                    cardGlazing={cart.cardGlazing}
                                    cardPackSize={cart.cardPackSize}
                                    onRemove={this.removeHandler}
                                />
                            }
                        )}
                    </div>
                    <div className="empty">
                        {this.getListLength()}
                    </div>
                    <hr className="divider" />

                </div>

                <div className="search-sort">
                    <form action="/pui-hw5/" method="get">
                        <input
                            type="text"
                            id="header-search"
                            name="s"
                        />
                        <button type="submit" onClick={this.searchButtonHandler(query)}>Search</button>
                    </form>

                    <div className="sort">
                        <p>Sort by: </p>
                        <Dropdown
                            action="/"
                            onChange={this.handleSortChange}
                        >
                            <Option textContent="Base Price" />
                            <Option textContent="Name" />
                        </Dropdown>
                    </div>
                </div>

                <div>

                    <div className="cards row">
                        <Sort by={this.state.sort}>
                            {this.state.cardData.map(
                                (card, idx) => {
                                    var tempCardTitle = card.cardTitle.toLowerCase()
                                    if ((this.state.searchCategory == null) ||
                                        (tempCardTitle.includes(this.state.searchCategory))) {
                                        this.state.count++
                                        return <Card
                                            key={idx}
                                            cardImgURL={card.cardImgURL}
                                            cardAlt={card.cardAlt}
                                            cardTitle={card.cardTitle}
                                            cardPrice={card.cardPrice}
                                            id1={card.id1}
                                            id2={card.id2}
                                            id3={card.id3}
                                            id4={card.id4}
                                            priceCallBack={this.handleCart}
                                            addToCartCallBack={this.addCardToCart}
                                            cardIdx={card.index}
                                        />
                                    } else {
                                        return <div
                                            key={idx} />
                                    }
                                }
                            )}
                        </Sort>
                        {this.handleCount()}
                    </div>

                </div>
            </div>
        );
    }
}

export default Homepage;