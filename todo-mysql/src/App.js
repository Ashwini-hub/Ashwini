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
      id: e.target.value,
    });
  }
  addItem = async (e) => {
    e.preventDefault();
    const id = this.state.id;
    console.log(id)
    const name = e.target.elements.name.value;
    console.log("in", id, name)
    var res = await axios.post(`http://localhost:4003/user`, {
      "id": id,
      "username": name
    })
    console.log(res.data)
    this.setState({
      todoList: res.data,
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
    const msg = e.target.elements.msg.value;
    console.log('in', msg, id)
    var res = await axios.post(`http://localhost:4003/details`, {
      "msg": msg,
      "userid": id
    })
    console.log('post ', res)
    this.setState({
      todoList: res.data,
      display: false
    })
  }
  updateItem = ({ id, msg, userid }) => <div key={id}> {userid} {id} {msg}</div>
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
              <input type="text" name="msg" required onChange={this.handleEdit} value={this.textchange} /><br />
              <button type="submit">ADD</button>
              {/* <NewItem data={this.state.todoItem} /> */}
              {todoList ? todoList.map(this.updateItem) : "No newItems available"}
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