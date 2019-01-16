import '@babel/polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { autobind } from 'core-decorators';
import config from 'app-config';
import catalog from './catalog';
import { _a, _b, _d, context as AppContext } from '@honzachalupa/helpers';
import './App.scss';
import Page_Home from 'Pages/Home';
import Page_QuantitySelector from 'Pages/QuantitySelector';
import Page_NotFound from 'Pages/NotFound';

class App extends Component {
    state = {
        cart: [],
        catalog,
        _addItemIntoCart: this.addItemIntoCart,
        _removeFromCart: this.removeFromCart
    }

    componentDidMount() {
        if (config.caching) {
            _a.initServiceWorker('/sw.js');
        }

        this.getCachedCart();
    }

    componentDidUpdate(prevProps, prevState) {
        const cartUpdated = _d.objectsAreDifferent(prevState.cart, this.state.cart);

        if (cartUpdated) {
            this.disableAddedItems();

            _b.setCookie('cart', JSON.stringify(this.state.cart));
        }
    }

    getCachedCart() {
        const cart = _b.getCookie('cart');

        if (_d.isValid(cart)) {
            this.setState({
                cart
            });
        }
    }

    disableAddedItems() {
        const { cart, catalog } = this.state;

        this.setState({
            catalog: [...catalog].map(item => ({
                ...item,
                isAdded: cart.map(item => item.id).includes(item.id)
            }))
        });
    }

    @autobind
    addItemIntoCart(id, quantity) {
        this.setState(prevState => {
            const { cart } = prevState;

            return {
                cart: [...cart, {
                    id,
                    quantity: Number(quantity)
                }]
            };
        });
    }

    @autobind
    removeFromCart(id) {
        this.setState(prevState => {
            const { cart } = prevState;

            return {
                cart: [...cart.filter(item => item.id !== id)]
            };
        });
    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                <Router>
                    <Switch>
                        <Route component={Page_Home} path="/" exact />
                        <Route component={Page_QuantitySelector} path="/vyber-mnozstvi/:id" exact />
                        <Route component={Page_NotFound} exact />
                    </Switch>
                </Router>
            </AppContext.Provider>
        );
    }
}

render(<App />, document.querySelector('#app'));
