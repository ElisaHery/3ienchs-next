import React, { useState } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import AlertDialog from './../AlertDialog';
import SliderContent from './../../../../../../components/Slider/components/SliderContent';

import { APICall } from '../../../../../../../utils/APICall';

export default function DetailedExpansionPanel({
  product,
  getProducts,
  handleEdit
}) {
  const [open, setOpen] = useState(false);

  const isFeaturing = product.featuring ? 'oui' : 'non';

  const handleDelete = id => {
    const fetch_param = {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' }
    };

    APICall(`http://localhost:4000/api/products/delete/${id}`, fetch_param)
      .then(response => {
        console.log('response -->', response);
        setOpen(false);
        getProducts();
        return response;
      })
      .catch(err => console.log(err.message));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='my-2'>
      <AlertDialog
        open={open}
        handleClose={handleClose}
        productName={product.product_name}
        handleDelete={handleDelete}
        productId={product.product_id}
      ></AlertDialog>
      <ExpansionPanel>
        <ExpansionPanelSummary
          aria-controls='panel1c-content'
          id='panel1c-header'
        >
          <div>
            <Typography>{product.product_name} </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div
            className='slider-width h-full'
            style={{
              backgroundImage: `url(/static/images/${product.product_bg})`,
              backgroundSize: 'cover'
            }}
          >
            <SliderContent product={product}></SliderContent>
          </div>
          <div className='flex flex-col p-5'>
            <Typography variant='h6'>Autres informations :</Typography>

            <Typography>Prix : {product.product_price} €</Typography>
            <Typography>Featuring ? {isFeaturing}</Typography>
            <Typography>Stock : {product.product_stock} </Typography>
          </div>
          <div></div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button
            size='small'
            onClick={e => handleEdit(e, 2, product.product_id)}
          >
            Editer
          </Button>
          <Button size='small' color='primary' onClick={() => setOpen(true)}>
            Supprimer
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}
