import React, { Component } from 'react';
//import request from 'superagent';
//import { Tasks } from './tasks.json'
import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation';
import TaskForm from './components/TaskForm';
import firebase from 'firebase'
import {DB_CONFIG} from './config/config'
import 'firebase/database'

// created by GaboGo 2019 

class App extends Component {

  constructor(){
    super();
    this.state = {
      tasks: []
    }
    this.handleAddTasks = this.handleAddTasks.bind(this);
    this.app = firebase.initializeApp(DB_CONFIG)
    this.db = this.app.database().ref().child('tasks')
  }
 
  componentDidMount(){
    // getting tasks from firebase DB
    const {tasks} = this.state;

    this.db.on('child_added', snap =>{
       tasks.push({
        id: snap.key,
        title: snap.val().taskContent.title,
        responsible: snap.val().taskContent.responsible,
        description: snap.val().taskContent.description,
        priority: snap.val().taskContent.priority
       })
       this.setState({tasks});
    });

    this.db.on('child_removed', snap =>{
      tasks.forEach((task,index) => {
        if(task.id === snap.key){
           tasks.splice(index,1)
        }
      });
      this.setState({tasks})
    });
    // getting tasks from json file using HTML5 fetch
    // fetch('tasks.json')
    // .then(res => res.json())
    // .then((data) => {
    //   this.setState({ tasks: data.tasks })
    // })
    // .catch(console.log)
 
    // getting tasks using superagent
    // request
    // .get('tasks.json')
    // .end((err,res) => {
    //   this.setState(JSON.parse(res.text));
    // })
  }

  handleAddTasks(task){
    // update state 
    // this.setState({
    //   tasks: [...this.state.tasks, task]
    // })
    this.db.push().set({taskContent: task})
  }

  handleRemoveTask(id){
    if(window.confirm("Are you sure you want to delete?")){
      this.db.child(id).remove();
    }
  }
  
  render(){
    const tasks = this.state.tasks.map((task) => {
      return (
        <div className="col-md-4">
          <div className="card mt-4">
            <div className="card-header">
              <h3>{task.title}</h3>
              <span className="badge badge-pill badge-danger ml-2">
                {task.priority}
              </span>
            </div>
            <div className="card-body">
              <p>{task.description}</p>
              <p><mark>{task.responsible}</mark></p>
            </div>
            <div className="card-footer">
              <button className="btn btn-danger mr-2" onClick={this.handleRemoveTask.bind(this,task.id)}>
                 Delete
              </button>
              <button className="btn btn-info mr-2" onClick={this.handleRemoveTask.bind(this,task.id)}>
                 Edit
              </button>
            </div>
          </div>  
        </div>
      )
    })

    return (
      <div className="App">
          <Navigation titulo="Tasks" tareas={this.state.tasks.length}></Navigation>
          
          <div className="container">
            <div className="row mt-4">
              <div className="col-md-3">
                <img src={logo} className="App-logo" alt="logo" />
                <TaskForm onAddTask={this.handleAddTasks}></TaskForm>
              </div>
              <div className="col-md-9">
                <div className="row">
                  {tasks}
                </div>
              </div>
            </div>
          </div> 
      </div>
    );
  }
}

export default App;
