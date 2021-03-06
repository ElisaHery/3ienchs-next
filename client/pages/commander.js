import React from 'react';
import fetch from 'isomorphic-unfetch';

import ClassicLayout from '../layouts/ClassicLayout';
import Order from '../src/pages/Order/index';

import './../less/style.less';

const OrderPage = props => (
  <ClassicLayout>
    <Order products={props}></Order>
  </ClassicLayout>
);

export default OrderPage;

OrderPage.getInitialProps = async function() {
  const resDogsProducts = await fetch(
    'http://localhost:4000/api/products/getDogsProducts'
  );
  const resFeatproducts = await fetch(
    'http://localhost:4000/api/products/getFeatProducts'
  );
  const dogsProducts = await resDogsProducts.json();
  const featProducts = await resFeatproducts.json();
  return {
    dogsProducts: dogsProducts.products,
    featProducts: featProducts.products
  };
};
