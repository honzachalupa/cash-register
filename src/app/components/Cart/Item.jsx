import { React, Fragment } from 'react';
import { _f } from '@honzachalupa/helpers';
import RemoveIcon from 'Icons/bin';
import Tile from 'Components/Tile';

export default props => {
    const { id, name, quantity, price, pricePerUnit, _removeFromCart } = props;
    console.log(props);

    return (
        <Tile key={id} className="item">
            <p className="quantity">
                {quantity}
                x
            </p>

            <p className="name">{name}</p>

            {quantity > 1 ? (
                <Fragment>
                    <div className="price-per-unit">
                        <p className="label">Cena za kus</p>
                        <p className="value">{_f.formatCurrency(pricePerUnit)}</p>
                    </div>

                    <div className="price">
                        <p className="label">Cena celkem</p>
                        <p className="value">{_f.formatCurrency(price)}</p>
                    </div>
                </Fragment>
            ) : (
                <div className="price">
                    <p className="label">Cena</p>
                    <p className="value">{_f.formatCurrency(price)}</p>
                </div>
            )}

            <button className="remove-button" type="button" onClick={() => _removeFromCart(id)}>
                <img src={RemoveIcon} alt="" />
            </button>
        </Tile>
    );
};
