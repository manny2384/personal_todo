import React from 'react';
import './App.css';
import TodoList from './TodoList';
import CreateItem from './CreateItem';

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      show_form: false,
      new_item:"",

      list:[]

    }

    // helper functionS
    this.handleSubmit = this.handleSubmit.bind(this); // handles submission of new item
    this.handleChange = this.handleChange.bind(this); // handles name modification of new item
    this.handleDelete = this.handleDelete.bind(this); // handles deletion of an existing item
    this.clearStorage = this.clearStorage.bind(this); // clears all todo items in local storage
    this.toggleOpen = this.toggleOpen.bind(this); // handles whether form to create item is opened or not
  }

  componentDidMount(){

    // try to retrieve localstorage todo items
    if(localStorage.getItem("my_todo") && JSON.parse(localStorage.getItem("my_todo")) != null){
      let arr = JSON.parse(localStorage.getItem("my_todo"));

      console.log("my_todo array = ", arr);

      // sort list
      arr = arr.sort((x, y) => {
        if(x[1] < y[1]) return -1;
        else if(x[1] < y[1]) return 1;
        else return 0;
      });


      this.setState({list: arr});
      
      console.log(JSON.parse(localStorage.getItem("my_todo")));

    }else{

      console.log("nothing in local storage\n");
      console.log(this.state.list);

    }
  
  }

  componentDidUpdate(){

    // sort based on item name


    // add list of items to local storage before closing
    try{
      localStorage.setItem("my_todo", JSON.stringify(this.state.list));
      console.log(JSON.parse(localStorage.getItem("my_todo")));
      document.querySelector("#New_Item").value = "";
      document.querySelector("#Duedate").value = "";
    }catch(err){
      console.log("Error in component did update", err);
    }

  }

  handleChange(event){

    // update new item name
    this.setState({
      new_item: event.target.value
    });

    
    event.preventDefault();
  }

  handleSubmit(event) {

    // check if empty item
    var itemName = document.querySelector("#New_Item").value;
    var itemDate = document.querySelector("#Duedate").value;
    if(itemName === null || itemName === "") return;

    // add new item to list of items
    this.setState((state, props) => {
      return {
        list: state.list.concat([[itemName, itemDate]]).sort((x, y) => {
          if(x[1] < y[1]) return -1;
          else if(x[1] < y[1]) return 1;
          else return 0;
        }),
        show_form: !state.show_form
      }
    });

    event.preventDefault();
  }
  
  handleDelete(event){
    console.log("clicked delete ", event.target.value);

    // check if item exists by returning index
    var idx, i = 0;
    
    while(this.state.list[i][0] !== event.target.value && i < this.state.list.length){
      console.log(i, this.state.list[i][0]);
      i++;
    }

    idx = i;
    if(idx > this.state.list.length - 1) return;

    // delete index item from list
    console.log("deleting index ", idx);
    this.state.list.splice(idx, 1);
    this.setState(state => {
      return {
        list: state.list
      }
    })

  }

  clearStorage(){

    this.setState({list: []});
    localStorage.clear();

  }

  toggleOpen(){
    this.setState({show_form: !this.state.show_form})
  }



  render (){

    return(   
      <div style={{height:"100%"}}>
        <div className="App">
        
          <ul className="TodoList"> 
            <TodoList todo={this.state.list} edit={this.toggleOpen} onDelete={this.handleDelete} />
          </ul>
          
          <div className="main_btns">
            <input type="button" value="ADD ITEM" onClick={this.toggleOpen} />
            
          </div>
        </div>

        {this.state.show_form && 
          <form className="New_item_form" onSubmit={this.handleSubmit}>
            <CreateItem toggleOpen={this.toggleOpen} />
          </form>
        }

     </div>
    );
  }
}

export default App;
