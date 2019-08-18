import React, { Component} from 'react';

class TaskForm extends Component {
   constructor(){
        super();
        this.state = {
            title: '',
            responsible: '',
            description: '',
            priority: 'low'
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formValidation = this.formValidation.bind(this);
   }

   handleInput(e){
       const { value, name} = e.target;
       this.setState({
          [name]: value
       })
       console.log(this.state);
   }

   formValidation(e){
      var inputs = e.target.querySelectorAll(".form-control");
      for (let index = 0; index < inputs.length; index++) {
          if (inputs[index].value == "") {
              inputs[index].classList.add('error');
              return false
          }else{
              inputs[index].classList.remove('error');
          }
      }
      return true;
      
   }

   handleSubmit(e){
       e.preventDefault();
       if(this.formValidation(e)){
         this.props.onAddTask(this.state)
         console.log("sending the data...")
       }else{
         const target = e.target;    
       }
       
   }
   
   render(){
       return (
          <div className="card">
             <form className="card-body" onSubmit={this.handleSubmit}>
                 <div className="form-group">
                    <input
                      type="text"
                      name="title"
                      onChange={this.handleInput}
                      className="form-control"
                      placeholder="Title"
                    />
                 </div>
                 <div className="form-group">
                    <input
                      type="text"
                      name="responsible"
                      onChange={this.handleInput}
                      className="form-control"
                      placeholder="Responsible"
                    />
                 </div>
                 <div className="form-group">
                    <input
                      type="text"
                      name="description"
                      onChange={this.handleInput}
                      className="form-control"
                      placeholder="Description"
                    />
                 </div>
                 <div className="form-group">
                    <select
                      name="priority"
                      className="form-control"
                      onChange={this.handleInput}
                    >
                    <option>low</option>
                    <option>medium</option>
                    <option>high</option>
                    </select>
                 </div>
                 <button type="submit" className="btn btn-primary">Submit</button>
             </form>
          </div>
       )
    }
}

export default TaskForm;