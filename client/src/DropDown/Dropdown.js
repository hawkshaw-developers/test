import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import '../../node_modules/semantic-ui-css/semantic.min.css';
import 'semantic-ui-css/semantic.min.css';
import '../Billing-Table/Table-style.css';

class DropdownExampleSearchSelection extends Component{
    constructor(props){
        super(props);

    }

    changed=(event)=>{
        console.log("parent change",event.target.textContent);
        // props.changed;
        this.props.changed(event.target.textContent,this.props.rowId);
        
    }
    render(){
        return(
            <Dropdown className="dropDown"
        placeholder='Select Country'
        fluid
        search
        selection
        options={this.props.options}
        onChange={this.changed}
    />
        );
    }
}



export default DropdownExampleSearchSelection;
