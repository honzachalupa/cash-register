import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import repeat from 'ramda/src/times';
import { context as AppContext } from '@honzachalupa/helpers';
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

    handleSelect(value) {
        this.setState(prevState => {
            const { quantity } = prevState;

            return {
                quantity: value === 'backspace'
                    ? quantity.substring(0, quantity.length - 1)
                    : `${quantity}${value}`
            };
        });
    }

    handleAddToCart() {
        const { id, _addItemIntoCart } = this.props;
        const { quantity } = this.state;

        if (quantity > 0) {
            _addItemIntoCart(id, quantity);

            this.handleRedirection('/');
        } else {
            alert('Zadejte prosím množství.');
        }
    }

    handleRedirection(url) {
        this.props.history.push(url);
    }

    render() {
        const { name, quantity } = this.state;

        return (
            <div>
                <h2>{`Vyberte množství pro ${name}`}</h2>

                <header className="header">
                    <Tile>
                        <input className="quantity" type="number" onChange={e => this.handleChange(e.target.value)} value={Number(quantity)} />
                    </Tile>

                    <Tile className="char remove-button" isScaleable onClick={() => this.handleSelect('backspace')} disabled={quantity.length <= 1}>Smazat</Tile>
                </header>

                <div className="numpad">
                    {repeat(number => (
                        <Tile key={number} className={`char char-${number}`} isScaleable onClick={() => this.handleSelect(number)}>{number}</Tile>
                    ), 9)}

                    <Tile className="char char-0" isScaleable onClick={() => this.handleSelect(0)}>0</Tile>
                    <Tile className="char add-button" isScaleable isDoubleWidth onClick={() => this.handleAddToCart()}>Přidat do košíku</Tile>
                </div>
            </div>
        );
    }
}
