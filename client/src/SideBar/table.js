import React, { Component } from 'react';
import BillingTable from '../Billing-Table/Billing_Table';
// import { any } from '../../../../../AppData/Local/Microsoft/TypeScript/3.6/node_modules/@types/prop-types';


export default class Table extends Component {
    // constructor(props){
    //     super(props);
    //     // this.state = {
    //     //     id :0,
    //     //     tablecount : 0,
    //     //     tablective : '',
    //     //     tablename : '',
    //     //     tableorder: 0
    //     // }
    // }
    constructor(props){
        super(props);
        this.state={
            tableData:"",
            isClick:false
        }
    }
    clickHandler(tabledata){
        // alert("Button Clicked!"+tabledata.tablename);
        console.log("Button Clicked!",tabledata.tablename);
        console.log("Button Clicked!",typeof(tabledata.tablename));
        // this.table= ;
        this.setState({
            tableData:tabledata.tablename,
            isClick:true
        });
        console.log("table name---->",this.state.tableData);

    }
    render() {
        let data = [
            {
                id: 0,
                tablename: 'Table 1',
                tablective: 'btn btn-success'

            },
            {
                id: 1,
                tablename: 'Table 2',
                tablective: 'btn btn-success table-btn'

            },
            {
                id: 2,
                tablename: 'Table 3',
                tablective: 'btn btn-success'

            },
            {
                id: 3,
                tablename: 'Table 4',
                tablective: 'btn btn-success table-btn'

            },
            {
                id: 4,
                tablename: 'Table 5',
                tablective: 'btn btn-success'

            },
            {
                id: 5,
                tablename: 'Table 6',
                tablective: 'btn btn-success table-btn'

            }

        ];

        let TableData = data.map(tabledata => {
            return (<button key={tabledata.id} class={tabledata.tablective} onClick={()=>this.clickHandler(tabledata)} >{tabledata.tablename}</button>)

        });

        return (
            <div class ="table-btn">
                {TableData}
                {this.state.isClick ? <BillingTable tableName={this.state.tableData} />:null}
            </div>
        )
    }

}