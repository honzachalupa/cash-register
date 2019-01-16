import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import removeDuplicites from 'ramda/src/uniq';
import { _d, context as AppContext } from '@honzachalupa/helpers';
import './style';
import Tile from 'Components/Tile';

export default withRouter(props => (
    <AppContext.Consumer>
        {({ catalog }) => (
            <Catalog {...props} catalog={catalog} />
        )}
    </AppContext.Consumer>
));

class Catalog extends Component {
    state = {
        categoryLabels: {
            cosmetics: 'Kosmetika',
            drink: 'Nápoje',
            fruit: 'Ovoce',
            vegetable: 'Zelenina',
            other: 'Ostatní'
        }
    };

    handleRedirection(url) {
        this.props.history.push(url);
    }

    groupCatalog() {
        const { catalog } = this.props;

        const categories = removeDuplicites(catalog.map(item => item.category)).sort();

        return categories.map(id => ({
            id,
            label: this.getCategoryLabel(id),
            items: catalog.filter(item => item.category === id)
        }));
    }

    getCategoryLabel(id) {
        const { categoryLabels } = this.state;

        const label = categoryLabels[id];

        return _d.isValid(label) ? label : id;
    }

    render() {
        const catalogGrouped = this.groupCatalog();

        return (
            <div>
                <h3>Seznam zboží</h3>

                <div className="items">
                    {catalogGrouped.map(group => (
                        <Fragment key={group.id}>
                            <div className="label-container">
                                <h4 className="label">{group.label}</h4>
                            </div>

                            {group.items.map(item => (
                                <Tile key={item.id} className="item" disabled={item.isAdded} isScaleable onClick={() => this.handleRedirection(`/vyber-mnozstvi/${item.id}`)}>{item.name}</Tile>
                            ))}
                        </Fragment>
                    ))}
                </div>
            </div>
        );
    }
}
