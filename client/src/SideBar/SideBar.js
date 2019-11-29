import React, { Component } from 'react';
import Table from './table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../Menu/Menu';


export default class SideNavPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sidebar: "show",
            sidebarwidth: "nav full ",
            sidebaranchartag: "sidebar-anchar-tag-show",
            count : 0,
            tablecontent:'tablecontent-full',
            menuClicked:false

        };
        this.handleClick = this.handleClick.bind(this);
    }
     handleClick(e) {
        e.preventDefault();
        this.state.count++;
        
          if(this.state.count == 1){
        
            this.setState(_state => ({
                sidebar: "hide",
                sidebarwidth: "nav half ",
                sidebaranchartag: "hide",
                tablecontent:'tablecontent-half'
              }));
        }
        else{
            this.setState(_state => ({
                sidebar: "show",
                sidebarwidth: "nav full ",
                sidebaranchartag: "sidebar-anchar-tag-show",
                count : 0, 
                tablecontent:'tablecontent-full'
              }));
        }
    }

    menuClicked=()=>{
        // alert("Menu Clicked");
        this.setState({menuClicked:!this.state.menuClicked});         
    }
    

    render() {
        let menu=null;
        let table=null;
        if(this.state.menuClicked){
            menu=(
                <Menu myEvent={this.state.menuClicked}></Menu>
            );
        }
        if(!this.state.menuClicked){
            table=(
                <Table/>
            );
        }
        return (
            <div>
                <div id="sidebar" class={this.state.sidebarwidth}>
                    <header  onClick={this.handleClick}>
                        <a href="#" class={this.state.sidebar}>Billing Applications</a>
                    </header>
                    <ul class="nav">
                        <li>
                            <i class="zmdi zmdi-view-dashboard" ></i>
                            <a href="#" class={this.state.sidebaranchartag}> Dashboard </a>
                        </li>
                        <li >
                            <i class="zmdi zmdi-link"></i>
                            <a href="#"  onClick={this.menuClicked} class={this.state.sidebaranchartag}>Menu</a>
                        </li>
                        <li>
                            <i class="zmdi zmdi-link"></i>
                            <a href="#" class={this.state.sidebaranchartag}>Billing</a>
                        </li>
                        <li>
                            <i class="zmdi zmdi-widgets"></i>
                            <a href="#" class={this.state.sidebaranchartag}>Expense</a>
                        </li>
                        <li>
                            <i class="zmdi zmdi-calendar"></i>
                            <a href="#" class={this.state.sidebaranchartag}>Report</a>
                        </li>
                        <li>
                            <i class="zmdi zmdi-calendar"></i>
                            <a href="#" class={this.state.sidebaranchartag}>Table</a>
                        </li>
                        <li>
                            <i class="zmdi zmdi-info-outline"></i>
                            <a href="#" class={this.state.sidebaranchartag}> About</a>
                        </li>
                    </ul>
                    <footer id="copyright" class={this.state.sidebar}>@copy Right at Hakwshaw Developers</footer>
                </div>
                <div id="content" class={this.state.tablecontent}>
                    <nav class="navbar navbar-default">
                        <div class="container-fluid">
                            <ul class="nav navbar-nav navbar-right">
                                <li>
                                  {table}
                                </li>
                            </ul>
                        </div>
                        <div class="container">{menu}</div>
                    </nav>
                </div>
            </div>
        );
    }
}