import React, { Component, Fragment } from 'react';
import AppContext from 'Helpers/context';
import { _formatCurrency } from 'Helpers/formatting';
import './style';
import { _isInvalid } from 'Helpers/data';
import RemoveIcon from 'Icons/bin';
import Tile from 'Components/Tile';

export default class Cart extends Component {
    static contextType = AppContext;

    mergeCartCatalog(cart) {
        return cart.map(item => {
            const { id, quantity } = item;
            const { name, pricePerUnit } = this.getCatalogItem(id);

            return {
                id,
                name,
                quantity,
                pricePerUnit,
                price: quantity * pricePerUnit
            };
        });
    }

    getCatalogItem(id) {
        const { catalog } = this.context;

        return catalog.find(item => item.id === id);
    }

    getPriceSum(items) {
        return items.reduce((sum, item) => sum + item.price, 0);
    }

    render() {
        const { cart, _removeFromCart } = this.context;

        if (!_isInvalid(cart)) {
            const items = this.mergeCartCatalog(cart);
            const priceSum = this.getPriceSum(items);

            return (
                <div>
                    <h3>Košík</h3>

                    <div className="items">
                        {items.map(item => (
                            <Tile key={item.id} className="item">
                                <p className="quantity">
                                    {item.quantity}
                                    x
                                </p>

                                <p className="name">{item.name}</p>

                                {item.quantity > 1 ? (
                                    <Fragment>
                                        <div className="price-per-unit">
                                            <p className="label">Cena za kus</p>
                                            <p className="value">{_formatCurrency(item.pricePerUnit)}</p>
                                        </div>

                                        <div className="price">
                                            <p className="label">Cena celkem</p>
                                            <p className="value">{_formatCurrency(item.price)}</p>
                                        </div>
                                    </Fragment>
                                ) : (
                                    <div className="price">
                                        <p className="label">Cena</p>
                                        <p className="value">{_formatCurrency(item.price)}</p>
                                    </div>
                                )}

                                <button className="remove-button" type="button" onClick={() => _removeFromCart(item.id)}>
                                    <img src={RemoveIcon} alt="" />
                                </button>
                            </Tile>
                        ))}
                    </div>

                    <div className="sum">
                        <p className="label">Celková cena:</p>
                        <p className="value">{_formatCurrency(priceSum)}</p>
                    </div>
                </div>
            );
        } else {
            return (
                <p>Košík je prázdný.</p>
            );
        }
    }
}
