import React,{Component} from 'react';
import ReactHTMLTableToExcel from '../../node_modules/react-html-table-to-excel';
import { CSVLink } from "react-csv";

class ExportToExcel extends Component{

render(){
    console.log("Excel--->",this.props.posts);
    return(
        <div>
            <ReactHTMLTableToExcel
            id="test-table-xls"
            className="export button btn btn-sm btn-primary"
            table="table-to-xls"
            fileName="Export.csv"
            sheet="tablexls"
            buttonText="Export"
            />
            <table hidden="true" id="table-to-xls">
                <thead>
                 <td>S No</td> 
                 <td>Item Code</td> 
                 <td>Rate</td>   
                </thead>
                <tbody>
                    {
                        this.props.posts.map(post=>
                            {
                                return(
                                    <tr key={post.id}>
                                        <td>{post.id}</td>
                                        <td>{post.name}</td>
                                        <td>{post.rate}</td>
                                    </tr>
                                )
                            }
                            )
                    }
                </tbody>
            </table>
        </div>
    );
}
}

export default ExportToExcel;
