import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newItem: "",
            display: true,
            todoList: [],
            id: null
        }
    }
    textChange = (e) => { //change by key always
        e.preventDefault()
        this.setState({
            id: e.target.value
        });
    }
    fetchDetails = async (id) => {
        fetch(`http://localhost:4002/user/${id}`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    todoList: res,
                })
            })
    }

    addItem = async (e) => {
        e.preventDefault();
        const id = this.state.id;
        const name = e.target.elements.name.value;
        console.log("in", id, name)
        await axios.post(`http://localhost:4002/user`, {
            "id": id,
            "username": name
        })
        this.fetchDetails(id)
        this.setState({
            display: false
        })
    }
    handleEdit = e => {
        e.preventDefault()
        const textChange = e.target.value;
        this.setState({ newItem: textChange });
    }
    handleKey = async (e) => {
        e.preventDefault();
        const id = this.state.id;
        const msg = this.state.newItem;
        console.log('in', msg, id)
        axios.post(`http://localhost:4002/details`, {
            "msg": msg,
            "userid": id
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
    updateItem = () => {
        //this.fetchDetails()
    }
    render() {
        const { todoList } = this.state;
        var edit = {};
        if (this.state.display) {
            edit.display = 'none';
        }
        return (

            <div className="content">
                <h1 >TO-DO </h1>
                <div className="id">
                    <form onSubmit={this.addItem}>
                        <input type="text" placeholder="enter id..." required onChange={this.textChange} /><br />
                        <input type="text" placeholder="enter username..." required name='name' /><br />
                        <button type="submit">Submit</button>
                    </form>
                    <div style={edit}>
                        <form onSubmit={this.handleKey}>
                            <input type="text" required onChange={this.handleEdit} /><br />
                            <button type="submit">ADD</button>
                            {/* <NewItem data={this.state.todoItem} /> */}
                            {this.updateItem()}
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}
// const NewItem = (props) => {
//   console.log('in props', props)
//   var newItem = props.todoItem;
//   console.log('in new value', newItem)
//   var updateItem = newItem.map((list) => {
//     return (
//       <li key={list.id}>
//         msg:{list.msg}
//       </li>)
//   })
//   return (
//     <ul>{updateItem}</ul>


//   )
// }

export default App