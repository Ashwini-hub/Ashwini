import React, { Component } from 'react';
import './App.css'
class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = { editing: false }
    }
    componentDidMount = () => { this.setState({ textChange: this.props.newItem }) }
    markCompleted = () => { this.props.itemCompleted(this.props.id); }
    deleteItem = () => { this.props.onDeleteItem(this.props.id); }
    handleEditing = () => { this.setState({ editing: true, textChange: this.state.textChange }); }
    handleEdit = e => {
        const textChange = e.target.value;
        this.setState({ textChange: textChange });
    }
    handleKeyPress = e => {
        e.preventDefault();

        if (e.keycode === 13) {
            this.setState({ editing: false, textChange: this.state.textChange });
        }
    }
    handleKey = e => {
        e.preventDefault();
        this.setState({ editing: false, textChange: this.state.textChange });
    }

    render() {
        const itemClass = "" + (this.props.completed ? "done" : "undone");
        var view = {};
        var edit = {};

        if (this.state.editing) {
            view.display = 'none';
        } else {
            edit.display = 'none';
        }

        return (
            <form>
                <ul className={itemClass}>
                    <div style={view}>
                        {/* const itemClass =(props) =>{  }
          {/* const completed=props.completed ? "done" : "undone") */}
                        <input type="checkbox" onChange={this.markCompleted} />
                        <label>
                            {this.state.textChange}
                        </label>
                        <button type="button" onClick={this.deleteItem}>Delete </button>
                        <button type="button" onClick={this.handleEditing}>Edit</button>
                        {/* <input type="text" onKeyPress={this.handleKeyPress} /> */}

                    </div>
                    <div style={edit}>
                        <input type="text" onChange={this.handleEdit} onKeyPress={this.onKeyPress} value={this.state.textChange} />
                        <button type="submit" onClick={this.handleKey} value={this.state.textChange} >Done</button>
                    </div>

                </ul>
            </form>


        );
    }
}
export default TodoItem