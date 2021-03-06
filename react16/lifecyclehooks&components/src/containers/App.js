import React, { Component } from 'react';
// import Radium, {StyleRoot} from 'radium';
import logo from './logo.svg';
// import Person from '../components/Person/Person'; // can leave off the .js
import Persons from '../components/Person/Person';
import Cockpit from '../components/Cockpit/Cockpit';
import classes from './App.css';
// import ErrorBoundary from '.././ErrorBoundary/ErrorBoundary';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    persons: [
      {id: 1, name: 'Max', age: 28},
      {id: 2, name: 'Henry', age: 24},
    ],
    otherStuff: 'some other stuff',
    showPersons: false
  }
  }

  componentWillMount(){
    console.log('app.js component will mount')
  }
  componentDidMount(){
    console.log('app.js component did mount')
  }
  // any change in state will automatically invoke re render
  // state = {
  //   persons: [
  //     {id: 1, name: 'Max', age: 28},
  //     {id: 2, name: 'Henry', age: 24},
  //   ],
  //   otherStuff: 'some other stuff',
  //   showPersons: false
  // }

  switchNameHandler = (newName) => {
    // console.log('Was clicked');
    // this.state.persons[1].name = "bob" don't do this.  React no likey
    // Component obj has a set state method
    this.setState({persons: [
      {name: newName, age: 29},
      {name: 'Henry', age: 25},
    ]})  // merges new state with the old one. LEAVES OTHER STUFF UNTOUCHED
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id
    })
    const person = {
      ...this.state.persons[personIndex]
    }
    // copy person we're typing in
    person.name = event.target.value
    // reconstruct the persons obj
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({
      persons: persons
    })
  }

  togglePersonsHandler = () => {
    // assures this returns to the class
    const doesShow = this.state.showPersons;
    this.setState({

      showPersons: !doesShow
    })
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice(); // copies the og array and returns a new one
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1);
    if (persons) {
        this.setState({persons: persons});
    }

  }

  render() { // every staeful component needs a render method

    let persons = null;
    // preferred way of outputting conditional content
    if (this.state.showPersons) {
      persons = (
          <div>
            <Persons persons={this.state.persons}
            clicked={() => this.deletePersonHandler}
            changed={this.nameChangedHandler}
            />
          </div>
      );
    }
    return (

      <div className={classes.App}>
        // <button onClick={() => {this.setState({showPersons: true})}}>Show Persons </button>
        <Cockpit appTitle={this.props.title} showPersons = {this.state.showPersons} persons={this.state.persons} clicked={this.togglePersonsHandler}/>
        {persons}

      </div>

      // gets compiled to return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'hello!!!!'));
    )
  }
}

export default App; // higher order component
