import React, { Component } from 'react';
import ReactTable from 'react-table';

class Table extends Component {


    constructor(props) {
        super(props);
    }

    render() {
        let columns = [
            {
                Header: "S No",
                accessor: "id",
                sortable: false,
                width: 100

            },
            {
                Header: "Item Code",
                accessor: "code",
                sortable: true
            },
            {
                Header: "Item Name",
                accessor: "name",
                sortable: true
            },
            {
                Header: "QTY",
                accessor: "qty",
                sortable: true
            },
            {
                Header: "Rate",
                accessor: "rate",
                sortable: false
            },
            {
                Header: "Total Price",
                accessor: "price",
                sortable: false
            }
        ];
        return (
            <div>
                Table will be here!!!

                <ReactTable
                    columns={columns}
                    // data={this.state.items}
                    defaultPageSize={5}
                    showPagination={false}
                // getTrProps={this.onRowClick}

                >

                </ReactTable>

            </div>
        );
    }
}


export default Table;

