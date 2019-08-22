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
        this.handleEdit = this.handleEdit.bind(this);
        this.formValidation = this.formValidation.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
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
          if (inputs[index].value === "") {
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

   handleEdit(e){
      e.preventDefault();
      if(this.formValidation(e)){
        this.props.onEditTask(this.state, true)
        console.log("sending the data...")
      }else{
        const target = e.target;    
      }
  }

   cancelEdit(){
      this.props.onEditTask(this.state, false)
   }

   render(){

       let isEdit = this.props.editState;
       return (
          <div className="card">
             <form className="card-body" onSubmit={isEdit ? this.handleEdit : this.handleSubmit}>
                 <div className="form-group">
                    <input
                      type="text"
                      value={isEdit ? this.props.currentTask.title : ""}
                      name="title"
                      onChange={this.handleInput}
                      className="form-control"
                      placeholder="Title"
                    />
                 </div>
                 <div className="form-group">
                    <input
                      type="text"
                      value={isEdit ? this.props.currentTask.responsible : ""}
                      name="responsible"
                      onChange={this.handleInput}
                      className="form-control"
                      placeholder="Responsible"
                    />
                 </div>
                 <div className="form-group">
                    <input
                      type="text"
                      value={isEdit ? this.props.currentTask.description : ""}
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
                    <option selected={(isEdit && this.props.currentTask.priority) === "low" ? true : false}>low</option>
                    <option selected={(isEdit && this.props.currentTask.priority) === "medium" ? true : false}>medium</option>
                    <option selected={(isEdit && this.props.currentTask.priority) === "high" ? true : false}>high</option>
                    </select>
                 </div>
                 {isEdit ? (
                     <section id="editBtns">
                        <button type="submit" className="btn btn-success mr-2">Edit</button>
                        <button type="button" onClick={this.cancelEdit} className="btn btn-danger mr-2">Cancel</button>
                     </section>
                  ) : (
                     <button type="submit" className="btn btn-primary">Submit</button> 
                  )}
             </form>
          </div>
       )
    }
}

export default TaskForm;