import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { _isInvalid } from 'Helpers/data';
import Layout from 'Layouts/Main';
import QuantitySelector from 'Components/QuantitySelector';

class QuantitySelectorPage extends Component {
    state = {
        id: null
    };

    componentDidMount() {
        const { id } = this.props.match.params;

        if (_isInvalid(id)) {
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
}

export default withRouter(QuantitySelectorPage);
