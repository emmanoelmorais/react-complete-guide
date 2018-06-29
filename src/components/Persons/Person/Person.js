import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classes from './Person.css';

import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass';

import {AuthContext} from '../../../containers/App';

class Person extends Component{
    constructor(props){
        super(props);
        console.log("[Person.js] Inside Constructor", props);
        this.inputElement = React.createRef();
    }

    componentWillMount(){
        console.log("[Person.js] Inside componentWillMount()");
    }

    componentDidMount(){
        console.log("[Person.js] Inside componentDidMount()");
        if(this.props.position === 0)
            this.inputElement.current.focus();
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log("[UPDATE Person.js] Inside shouldComponentUpdate()", nextProps, nextState);
        return true;
    }

    componentWillUpdate(nextProps, nextState){
        console.log("[UPDATE Person.js] Inside componentWillUpdate()", nextProps, nextState);
    }

    componentDidUpdate(){
        console.log("[UPDATE Person.js] Inside componentDidUpdate()");
    }

    focus(){
        this.inputElement.current.focus();
    }
  
    render(){
        console.log("[Person.js] Inside render()");
        return (
            <Aux>
                <AuthContext.Consumer>
                    {auth => auth ? <p>I'm Authenticated</p> : null}
                </AuthContext.Consumer>
                <p onClick={this.props.click}>I'm {this.props.name} and a I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input 
                    type="text"
                    ref={this.inputElement} 
                    onChange={this.props.changed} 
                    value={this.props.name} />
            </Aux>        
        );
    }
}

Person.propTypes= {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, classes.Person);