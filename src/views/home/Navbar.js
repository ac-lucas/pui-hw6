import React, { Component } from 'react';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggle: true
        }
        this.toggle = this.handleToggle.bind(this);
    }

    handleToggle = (event) => {
        this.setState ({
            toggle: !this.state.toggle
        })
        this.props.cardCallBack(this.state.toggle)
    }



    render() {
        return (
            <div>
                <div className="navbar">

                    <div className="navbar-left">
                        <img className="navbar-img" src="assets/logo-01.svg" alt="bun bun bake shop cinnamon roll logo" />
                    </div>

                    <div className="navbar-right">

                        <div className="navbar-links">
                            <a href="" id="selected-link">PRODUCTS</a>
                            <a onClick={this.handleToggle}>CART</a>
                        </div>

                        <hr className="navbar-divider" />

                        <div className="navbar-title">
                            <h1>Our hand-made cinnamon rolls</h1>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar