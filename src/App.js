import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';


class App extends Component {
  state = {
    persons: [
      {id: "sfasf", name: "Thiago", age: 31},
      {id: "wrq", name: "Daniel", age: 26},
      {id: "fsfa", name: "Helder", age: 30}
    ],
    otherState: "some other value",
    showPersons: false
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
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

  render() {
    const style = {
      backgroundColor: "green",
      color:"white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer"
    };

    let persons = null;

    if(this.state.showPersons){
      persons = (
        <div>
            {
              this.state.persons.map((person, index) => {
                return <Person
                        key={person.id}  
                        name={person.name} 
                        age={person.age}
                        click={() => this.deletePersonsHandler(index)}
                        changed={(event) => this.nameChangeHandler(event,person.id)} />
              })
            }
          </div>
      );

      style.backgroundColor = "red";
    }

    let assignedClasses = [];

    if(this.state.persons.length <= 2){
      assignedClasses.push(classes.red);
    }

    if(this.state.persons.length <= 1){
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(" ")}>This is really working!</p>
        <button 
          onClick={this.togglePersonsHandler}
          style={style}>Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

export default App;
