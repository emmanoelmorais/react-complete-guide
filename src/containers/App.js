import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

import Aux from '../hoc/Aux';
import withClass from '../hoc/withClass';

export const AuthContext = React.createContext(false);

class App extends PureComponent {
  constructor(props){
    super(props);
    console.log("[App.js] Inside Constructor", props);

    this.state = {
      persons: [
        {id: "sfasf", name: "Thiago", age: 31},
        {id: "wrq", name: "Daniel", age: 26},
        {id: "fsfa", name: "Helder", age: 30}
      ],
      otherState: "some other value",
      showPersons: false,
      toggleClicked:0,
      authenticated: false
    }
  } 

  componentWillMount(){
    console.log("[App.js] Inside componentWillMount()");
  }

  componentDidMount(){
    console.log("[App.js] Inside componentDidMount()");
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   console.log("[UPDATE App.js] Inside shouldComponentUpdate()", nextProps, nextState);
  //   return nextState.person !== this.state.persons ||
  //     nextState.showPersons !== this.state.showPersons;
  // }

  componentWillUpdate(nextProps, nextState){
    console.log("[UPDATE App.js] Inside componentWillUpdate()", nextProps, nextState);
  }

  static getDerivedStateFromProps(nextProps, prevState){
    console.log("[UPDATE App.js] Inside getDerivedStateFromProps()", nextProps, prevState);
    return prevState;
  }

  getSnapshotBeforeUpdate(){
    console.log("[UPDATE App.js] Inside getSnapshotBeforeUpdate()");
  }

  componentDidUpdate(){
    console.log("[UPDATE App.js] Inside componentDidUpdate()");
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState((prevState, props) => {
      return {
        showPersons: !doesShow, 
        toggleClicked: prevState.toggleClicked + 1 
      }
    });
  }

  deletePersonsHandler= (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons: persons});
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    })
  }

  loginHandler = () => {
    this.setState({
      authenticated: true
    });
  }

  render() {
    console.log("[App.js] Inside render()");
    let persons = null;

    if(this.state.showPersons){
      persons = <Persons 
              persons={this.state.persons}
              clicked={this.deletePersonsHandler}
              changed={this.nameChangeHandler} />;
    }

    return (
      <Aux>
        <button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
        <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          togglePersonsHandler={this.togglePersonsHandler}
          login={this.loginHandler} />
        <AuthContext.Provider value={this.state.authenticated}>
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
  }
}

export default withClass(App, classes.App);
