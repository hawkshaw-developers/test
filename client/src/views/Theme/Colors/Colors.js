import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap';
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';
import BillForm from "../../../components/billForm";

class ThemeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bgColor: 'rgb(255, 255, 255)'
    }
  }

  componentDidMount() {
    const elem = ReactDOM.findDOMNode(this).parentNode.firstChild
    const color = window.getComputedStyle(elem).getPropertyValue('background-color')
    this.setState({
      bgColor: color || this.state.bgColor
    })
  }

  render() {

    return (
      <table className="w-100">
        <tbody>
          <tr>
            <td className="text-muted">HEX:</td>
            <td className="font-weight-bold">{rgbToHex(this.state.bgColor)}</td>
          </tr>
          <tr>
            <td className="text-muted">RGB:</td>
            <td className="font-weight-bold">{this.state.bgColor}</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

class ThemeColor extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {

    // const { className, children, ...attributes } = this.props
    const { className, children } = this.props

    const classes = classNames(className, 'theme-color w-75 rounded mb-3')

    return (
      <Col xl="2" md="4" sm="6" xs="12" className="mb-4">
        <div className={classes} style={{ paddingTop: '75%' }}></div>
        {children}
        <ThemeView />
      </Col>
    )
  }
}

class Colors extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <i className="icon-docs"></i> Billing
          </div>
          <div className="card-body">

            <BillForm></BillForm>
          </div>
        </div>


      </div>
    );
  }
}

export default Colors;
