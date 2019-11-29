import React, { Component } from "react";
import SimpleTable from "./billTable";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class BillForm extends Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      value: 0,
      quantity: 0,
      items: [
        {
          id: 0,
          name: "",
          quantity: 0,
          price: 0,
          total: 0
        }
      ],
      selectedItems: [],
      item: {
        id: 0,
        name: "",
        quantity: 0,
        rate: 0,
        total: 0
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
    this.handleItemQuantityChange = this.handleItemQuantityChange.bind(this);
    this.getItemByID = this.getItemByID.bind(this);
  }

  componentDidMount() {
    console.log("inited");
    fetch("/menu/getMenu")
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(items => this.setState({ items }));
  }


  getItemByID = (idx) => {
    var x;
    this.state.items.map((item, sidx) => {
      if (idx == sidx) {
        console.log(item);
        x = item;
      }
    });
    return x;
  };

  handleItemChange = (idx, evt) => {
    console.log("Item Changed");
    const newShareholders = this.state.selectedItems.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return this.getItemByID(evt.target.value);
    });
    this.setState({ selectedItems: newShareholders });
  };
  handleItemQuantityChange = (idx, evt) => {
    console.log("Quantity Changed");
    const newShareholders = this.state.selectedItems.map(
      (shareholder, sidx) => {
        if (idx !== sidx) return shareholder;
        console.log(shareholder);
        return {
          ...shareholder,
          quantity: evt.target.value,
          total: shareholder.price * evt.target.value
        };
      }
    );
    this.setState({ selectedItems: newShareholders });
  };
  handleSubmit = evt => {
    var itemIds = [];
    var quantity = [];
    this.state.selectedItems.map((item, idx) => {
      itemIds[idx] = item._id;
      quantity[idx] = item.quantity;
    });
    var total = this.calculateTotal();
    const options = {
      method: "POST",
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ item: itemIds, quan: quantity, total: total })
    }
    console.log(options);
    fetch("/bill/addBill", options)
      .then(res => console.log(res));
  };

  handleRemoveItem = idx => () => {
    console.log(idx);
    this.setState({
      selectedItems: this.state.selectedItems.filter((s, sidx) => idx !== s.id)
    });
  };

  calculateTotal = () => {
    let totalPrice = 0.0;
    this.state.selectedItems.map((item, idx) => {
      totalPrice = totalPrice + item.price * item.quantity;
    });
    return totalPrice;
  };

  handleChange(event) {
    this.setState({
      selectedItems: this.state.selectedItems.concat([this.state.item])
    });
    console.log(this.state.selectedItems);
  }

  handleSelectChange(event) {
    console.log(event.target.id);
    switch (event.target.id) {
      case "quantity":
        console.log(event.target.value);
        this.handleItemQuantityChange(event.target.parentNode.parentNode.rowIndex - 1, event);
        break;
      case "item":
        console.log(event.target.value);
        this.handleItemChange(event.target.parentNode.parentNode.rowIndex - 1, event);
        break;
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <button type="button" onClick={this.handleChange}>
          Add
        </button>

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Item Name</TableCell>
                <TableCell align="center">Rate</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {/* <TableRow>
                <TableCell align="center">
                  <select id="item" onChange={this.handleSelectChange}>
                    {this.state.items.map(row => (
                      <option value={row.id}>{row.name}</option>
                    ))}
                  </select>
                </TableCell>
                <TableCell align="center">{this.state.item.rate}</TableCell>
                <TableCell align="center">
                  <input id="quantity" type="number" onChange={this.handleSelectChange}></input>
                </TableCell>
                <TableCell align="center">
                  {this.state.item.quantity * this.state.item.rate}
                </TableCell>
              </TableRow> */}
              {this.state.selectedItems.map(row => (
                <TableRow key={row.name}>
                  <TableCell align="center" component="th" scope="row">
                    <select id="item" onChange={this.handleSelectChange} value={row.id}>
                      {this.state.items.map(srow => (
                        <option value={srow.id}>{srow.name}</option>
                      ))}
                    </select>
                  </TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">
                    <input id="quantity" type="number" onChange={this.handleSelectChange}></input>
                  </TableCell>
                  <TableCell align="center">{row.price * row.quantity}</TableCell>
                  <TableCell align="center">
                    <button type="button" onClick={this.handleRemoveItem(row.id)}>
                      Remove
                  </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <h5>Grand Total : {this.calculateTotal()}</h5>
        <button type="button" onClick={this.handleSubmit}>Print Bill</button>
      </form>
    );
  }
}

export default BillForm;
