import React , {Component} from 'react';

import classes from './Person.css';
//  best way to make a component, clear about what they do, don't manipulate app state, dynamic

class Person extends Component {
  render() {
    return (
      <div className={classes.Person}>
        <p onClick={this.props.clicked}>My name is {this.props.name} and I am {this.props.age}</p>
        <p>{this.props.children}</p>
        <input type="text" onChange={this.props.changed} value={this.props.name}/>
      </div>
    )
  }
}

export default Person;
