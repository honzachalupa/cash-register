import React from 'react';
import Layout from 'Layouts/Main';
import Catalog from 'Components/Catalog';
import Cart from 'Components/Cart';

export default () => (
    <section>
        <Layout>
            <Catalog />

            <Cart />
        </Layout>
    </section>
);
