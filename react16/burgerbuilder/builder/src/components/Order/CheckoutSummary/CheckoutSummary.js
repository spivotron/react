import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes good! </h1>
      <div style={{width: '300px', height:'300px', margin:'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button btnType="Danger" clicked>Cancel</Button>
      <Button btnType="Success" clicked>Continues</Button>
    </div>
  )

}

export default checkoutSummary;