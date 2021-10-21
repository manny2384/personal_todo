function CreateItem(props){

    return <div className="New_item_style">
        <div className="New_item_labels"_>
            <label> Item Name: <input id="New_Item" /> </label>
            <label> Due Date: <input type="date" min="2021-10-30" max="2030-10-30" id="Duedate" /> </label>
        </div>
        <div className="New_item_btns">
            <input type="submit" value="Add Item" />
            <input type="button" value="Cancel" onClick={props.toggleOpen} />
        </div>
    </div>;


}

export default CreateItem;