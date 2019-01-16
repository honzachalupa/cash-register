import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { _d } from '@honzachalupa/helpers';
import Layout from 'Layouts/Main';
import QuantitySelector from 'Components/QuantitySelector';

export default withRouter(class QuantitySelectorPage extends Component {
    state = {
        id: null
    };

    componentDidMount() {
        const { id } = this.props.match.params;

        if (!_d.isValid(id)) {
            this.handleRedirection('/');
        }

        this.setState({
            id
        });
    }

    handleRedirection(url) {
        this.props.history.push(url);
    }

    render() {
        const { id } = this.state;


        return id && (
            <section>
                <Layout>
                    <QuantitySelector id={Number(id)} />
                </Layout>
            </section>
        );
    }
});
