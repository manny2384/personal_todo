function TodoList(props){

    console.log(props);
  
    if(!props['todo']){
      console.log("nothing to return");
      return null;
    }
  
    else 
    {  
      const returner = props['todo'].map((item, index)=>{
        return <li onClick={()=>{

        }} className="TodoListItem" key={index+1}> 
                <div> {item[0]} </div> 
                <div> Due: {item[1]} </div>
                <button style={{padding:"5px", margin:"5px"}} type="submit" value={item[0]} onClick={props.onDelete}> Remove </button>
        </li>
      });
  
      return returner;
    }
    
  
}

export default TodoList;