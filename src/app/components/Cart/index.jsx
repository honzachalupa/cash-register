import React, { Component } from 'react';
import { _d, _f, context as AppContext } from '@honzachalupa/helpers';
import './style';
import Item from './Item';

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

        if (_d.isValid(cart)) {
            const items = this.mergeCartCatalog(cart);
            const priceSum = this.getPriceSum(items);

            return (
                <div>
                    <h3>Košík</h3>

                    <div className="items">
                        {items.map(item => (
                            <Item {...item} _removeFromCart={_removeFromCart} />
                        ))}
                    </div>

                    <div className="sum">
                        <p className="label">Celková cena:</p>
                        <p className="value">{_f.formatCurrency(priceSum)}</p>
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
