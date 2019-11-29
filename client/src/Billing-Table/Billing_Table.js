import React, { Component } from 'react';

import Table from './Table';

class BillingTable extends Component{
    constructor(props){
        super(props);

    }

    render(){
        console.log("inside the billing table render method");
        console.log("Table name value is --->",this.props.tableName);
        return(
            <div>
                <h1 style={{color:"red"}}>Billing</h1>
                <h1>{this.props.tableName}</h1>
                <Table/>
            </div>
        );
    }
}

export default BillingTable;