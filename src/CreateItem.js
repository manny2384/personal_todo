function CreateItem(props){

    let today = new Date();
    console.log(today.getDate(), today.getMonth(), today.getFullYear());
    let day = today.getDate();
    let month = today.getMonth()+1;
    let year = today.getFullYear();

    if(day < 10) day = '0' + day;
    if(month < 10) month = '0' + month;
    

    return <div className="New_item_style">
        <div className="New_item_labels"_>
            <label> Item Name: <input id="New_Item" /> </label>
            <label> Due Date: <input type="date" min={year + '-' + month + '-' + day} max="2030-10-30" id="Duedate" /> </label>
        </div>
        <div className="New_item_btns">
            <input type="submit" value="Add Item" />
            <input type="button" value="Cancel" onClick={props.toggleOpen} />
        </div>
    </div>;


}

export default CreateItem;