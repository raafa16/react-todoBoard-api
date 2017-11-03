import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodosContainer from './components/TodosContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title" >React To Do List</h1>
        </header>
        {/* <p className="App-intro"> */}
          <TodosContainer />
        {/* </p> */}
      </div>
    );
  }
}

export default App;
