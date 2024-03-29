import React, { Component } from 'react';
import "./Menu.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactTable from 'react-table';
import '../../node_modules/react-table/react-table.css';
import Popup from "reactjs-popup";
import ExportToExcel from './ExportToExcel';
import { CSVLink } from "react-csv";
import ExcelReader from './ExcelReader';


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            showPopup: false,
            modal: false,

            modalItemName: "",
            modalRate: 0,
            isEditMode: false,
            testData: "",
            codeValue: ""
        }
        this.renderEditable = this.renderEditable.bind(this);
    }
    componentDidMount() {
        fetch("/menu/getMenu").then(res => {
            return res.json();
        })
            .then(items => this.setState({ items }));
    }
    handleNameChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            modalItemName: value
        });
    }
    handleRateChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            modalRate: value
        });
    }

    handleSubmit(e) {
        let count = Object.keys(this.state.items).length;
        console.log("The total number of objects in the json ---->", count);
        this.setState({ modalItemName: this.state.modalItemName, modalRate: this.state.modalRate });
        this.modalClose();
        console.log(this.state.modalItemName, this.state.modalRate);
        let newItems = this.state.items;
        newItems.push({
            id: count + 1,
            name: this.state.modalItemName,
            rate: this.state.modalRate,
            code: this.state.codeValue

        });
        this.setState({ items: newItems });

    }

    modalClose = (event) => {
        this.setState({
            modalItemName: "",
            modalRate: "",
            modal: false
        });
        this.closePopup();
    }

    deleteHandler(id) {
        console.log(id + " will be delete");
        const index = this.state.items.findIndex(p => {
            return p.id === id;
        });
        let newState = this.state.items.filter(p => {
            return p.id !== id;
        });

        this.setState({ items: newState });
    }

    editHandler() {

        let currentState = this.state.isEditMode;
        console.log("Current state of the mode--->", currentState);
        this.setState({ isEditMode: !this.state.isEditMode });
    }


    renderEditable(cellInfo) {
        if (this.state.isEditMode) {

            return (
                <div
                    style={{ backgroundColor: "#fafafa" }}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => {
                        const data = this.state.items[cellInfo.original.id];
                        let originalState = JSON.parse(JSON.stringify(this.state.items));
                        console.log("Data ------>>>", data);
                        originalState[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                        this.setState({ items: originalState });
                    }}
                >{this.state.items[cellInfo.index][cellInfo.column.id]}</div>
            );

        }
        else {
            return (
                <div>{this.state.items[cellInfo.index][cellInfo.column.id]}</div>
            );
        }

    }
    valueChangeHandler = (newData) => {
        console.log("Before ------->", this.state.testData);
        this.setState({ testData: newData });

        console.log("Before ------->", this.state.testData);
        this.setState({
            items: newData
        })
    }
    handleCodeChange = (event) => {
        console.log("code-->", event.target.value);
        this.setState({
            codeValue: event.target.value
            , showPopup: false
        });
    }
    togglePopup() {
        this.setState({ showPopup: !this.state.showPopup });
    }
    closePopup() {
        this.setState({ showPopup: false });
    }
    openPopup() {
        this.setState({ showPopup: true });
    }

    render() {
        console.log(this.props.myEvent);

        let columns = [
            {
                Header: "S No",
                accessor: "id",
                sortable: false,
                width: 100

            },
            {
                Header: "Item Code",
                accessor: "name",
                sortable: true,
                filterable: true,
                width: 100,
                Cell: this.renderEditable
            },
            {
                Header: "Rate",
                accessor: "rate",
                sortable: false,
                width: 100,
                Cell: this.renderEditable
            },
            {
                Header: "Code",
                accessor: "code",
                sortable: false,
                width: 100,
                Cell: this.renderEditable
            },
            {
                Header: "Actions",
                Cell: props => {
                    return (<button class="btn btn-sm" onClick={() => {
                        this.deleteHandler(props.original.id);
                    }}><i class="fa fa-trash fa-lg"></i></button>);
                }
            }
        ];
        return (
            <div>
                <div>

                    <Popup

                        trigger={<button class="button btn btn-ghost-primary active" onClick={this.openPopup}> Add Data </button>}

                        modal
                        closeOnDocumentClick
                        className="popup"
                        open={this.state.showPopup}
                        onClose={this.closePopup.bind(this)}
                    >
                        <div className="modal">
                            <a className="close" onClick={this.closeModal}>
                                &times;
            </a>
                            <span>Add Data Here</span><br></br>
                            <input value={this.state.modalItemName}
                                name="modalItemName"
                                onChange={e => this.handleNameChange(e)} id="code" type="text" placeholder="item_code"></input><br></br>
                            <input
                                value={this.state.modalRate}
                                name="modalRate"
                                onChange={e => this.handleRateChange(e)}
                                id="price" type="text" placeholder="item_price"></input><br></br>
                            <input value={this.state.codeValue} name="codeValue" onChange={e => this.handleCodeChange(e)} id="codeValue" placeholder="code">

                            </input><br></br>
                            <button onClick={e => this.handleSubmit(e)} >Save</button>
                            <button onClick={this.modalClose.bind(this)}>Cancel</button>
                        </div>
                    </Popup>
                </div>

                <button class="btn btn-ghost-primary active" onClick={this.editHandler.bind(this)}>{this.state.isEditMode ? "Cancel" : "Edit"}</button>

                <ExcelReader onValueChange={this.valueChangeHandler} />

                <ReactTable
                    columns={columns}
                    data={this.state.items}
                    defaultPageSize={5}
                    showPagination={false}
                    getTrProps={this.onRowClick}
                    className="table table-responsive-sm table-striped"

                >

                </ReactTable>
                <ExportToExcel posts={this.state.items} />
                <CSVLink data={this.state.items}>Download CSV</CSVLink>
            </div>
        );
    }


}


export default Menu;
