import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppContext from 'Helpers/context';
import './style';
import Tile from 'Components/Tile';

export default withRouter(props => (
    <AppContext.Consumer>
        {({ catalog, _addItemIntoCart }) => (
            <QuantitySelector {...props} catalog={catalog} _addItemIntoCart={_addItemIntoCart} />
        )}
    </AppContext.Consumer>
));

class QuantitySelector extends Component {
    state = {
        quantity: 0
    };

    componentDidMount() {
        this.getItem();
    }

    getItem() {
        const { id, catalog } = this.props;

        this.setState({
            ...catalog.find(item => item.id === id)
        });
    }

    handleChange(quantity) {
        this.setState({
            quantity
        });
    }

    handleNumberSelect(value) {
        this.setState(prevState => {
            let { quantity } = prevState;

            quantity = value === 'backspace'
                ? quantity.substring(0, quantity.length - 1)
                : `${quantity}${value}`;

            return {
                quantity
            };
        });
    }

    handleAddToCart() {
        const { id, _addItemIntoCart } = this.props;
        const { quantity } = this.state;

        if (quantity > 0) {
            _addItemIntoCart(id, quantity);

            this.handleRedirection('/');
        }
    }

    handleRedirection(url) {
        this.props.history.push(url);
    }

    getCharButton(char) {
        return (
            <Tile key={char} className={`char char-${char}`} isScaleable onClick={() => this.handleNumberSelect(char)}>{char}</Tile>
        );
    }

    render() {
        const { name, quantity } = this.state;

        const numpadBlock = [];
        for (let i = 1; i <= 9; i += 1) {
            numpadBlock.push(this.getCharButton(i));
        }

        return (
            <div>
                <h2>{`Vyberte množství pro ${name}`}</h2>

                <header className="header">
                    <Tile>
                        <input className="quantity" type="number" onChange={e => this.handleChange(e.target.value)} value={Number(quantity)} />
                    </Tile>

                    {this.getCharButton('backspace')}
                </header>

                <div className="numpad">
                    {numpadBlock}
                    {this.getCharButton(0)}

                    <Tile className="char add-button" isScaleable isDoubleWidth onClick={() => this.handleAddToCart()}>Přidat do košíku</Tile>
                </div>
            </div>
        );
    }
}
