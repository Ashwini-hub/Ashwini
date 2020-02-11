import React, { Component } from 'react';
import './App.css';
import TodoItem from './TodoItem'

class TodoList extends Component {
    render() {
        return (
            <ul>
                {this.props.list.map(item => (
                    <TodoItem key={item.id} id={item.id} newItem={item.newItem} completed={item.done} itemCompleted={this.props.itemCompleted} onDeleteItem={this.props.onDeleteItem} onchangeItem={this.props.onchangeItem} onedit={this.props.onedit} />
                ))}
            </ul>
        );
    }
}
export default TodoList