import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../hoc/axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index'
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
class ContactData extends Component {
  state = {
    orderForm : {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Zipcode'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      delivery: {
        elementType: 'select',
        elementConfig: {
          options: [{value: 'fastest', displayValue: 'fastest'}, {value: 'cheapest', displayValue: 'cheapest'}]
        },
        value: '',
        validation: {},
        valid: true
      }
    },
    formIsValid: false,
    
  }

  orderHandler = (e) => {
    e.preventDefault()
    // this.setState({loading: true});
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value; // what the user entered
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    }
    this.props.onOrderBurger(order)
    // axios.post('/orders.json', order).
    // then(
    //   response => {
    //       this.setState({loading: false});
    //       this.props.history.push('/');
    //   })
    // .catch(error => {
    //   this.setState({loading: false})
    // })
  }

  checkValidity(value, rules) {
    let isValid = true;

    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }


  inputChangedHandler = (event, inputIdentifier) => {
    console.log(inputIdentifier)
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {...updatedOrderForm[inputIdentifier]} // safely clones nested objects
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true;
    console.log(updatedFormElement)
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for(let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  }

  render() {
    const formElements = [];
    for(let key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
        <form onSubmit={this.orderHandler}>

            {formElements.map(formElement => (
              <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                invalid={!formElement.config.valid}
                shouldValidate = {formElement.config.validation}
                touched={formElement.config.touched}
                value={formElement.config.value} changed={(e)=> this.inputChangedHandler(e,formElement.id)}
                />
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}> Order </Button>
        </form>);
    if (this.state.loading)
    {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4> Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData,axios));
