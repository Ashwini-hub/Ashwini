import React, { Component } from 'react';
import './App.css';
import TodoList from './TodoList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      newItem: ""
    };
  }
  textChange = e => { //change by key always
    this.setState({
      newItem: e.target.value
    });
  }
  addItem = e => {
    e.preventDefault();

    const newItems = {
      id: 1 + Math.random(),
      newItem: this.state.newItem,
      done: false
    };

    this.setState((prevState) => ({
      list: prevState.list.concat(newItems),
      newItem: ""
    }));
  }
  markItemCompleted = id => {
    const updatedItems = this.state.list.map(item => {
      if (id === item.id)
        item.done = !item.done;

      return item;
    });
    this.setState({
      list: updatedItems
    });
  }
  deleteItem = id => {
    const updatedItems = this.state.list.filter(item => {
      return item.id !== id;
    });

    this.setState({
      list: updatedItems
    });
  }

  render() {
    return (
      <form className="id" >
        <div className="content">
          <h1 >TO-DO </h1>
          <div className="id">
            <input type="text" placeholder="enter here..." onChange={this.textChange} value={this.state.newItem} />
            {/* <input type="text" onChange={e => this.handleChange(e)} /> */}
            <button onClick={this.addItem} disabled={!this.state.newItem}>Add</button>
            <TodoList list={this.state.list} itemCompleted={this.markItemCompleted} onDeleteItem={this.deleteItem}/>
          </div>
        </div>
      </form>

    );
  }
}

export default App