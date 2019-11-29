import React, { Component } from "react";
import Tablel from "../views/Base/Tables/Tables";

import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

class SimpleTable extends Component {


  constructor() {
    super();
    this.state = {
      total: 0,
      value: 0,
      quantity: 0,
      items: [
        {
          id: 0,
          Added_Time: "",
          Total: 0
        }
      ],
    };
  }
  componentDidMount() {
    console.log("inited");
    fetch("/bill/getBill")
      .then(res => {
        return res.json();
      })
      .then(items => this.setState({ items })).then(console.log(this.state.items));

  }


  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i> Sales Report
                </CardHeader>
          <CardBody>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>Bill No</th>
                  <th>Date </th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {this.state.items.map((row, index) => (
                  <tr><td>{index}</td>
                    <td>{row.Added_Time}</td>
                    <td>{row.Total}</td></tr>
                ))}
              </tbody>
            </Table>
            <Pagination>
              <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
              <PaginationItem active>
                <PaginationLink tag="button">1</PaginationLink>
              </PaginationItem>
              <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
            </Pagination>
          </CardBody>
        </Card>
      </div>


    );

  }
}

export default SimpleTable;
