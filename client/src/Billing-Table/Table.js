import React, { Component } from 'react';
import ReactTable from 'react-table';
import Dropdown from '../DropDown/Dropdown';

import MutipleTable from './Multiple_Table';

// const options =[
//     // {
//     // key:"code1",value:"code1",flag:"code1",text:"Item 1"
//     // },
//     // {
//     //     key:"code2",value:"code2",flag:"code2",text:"Item 2"
//     //     },
// ]
let qty=1;
class Table extends Component {


    constructor(props) {
        super(props);
        this.state={
            error:null,
            data:[],
            isLoad:false,
            selectedItem:"",
            qty:1
        
        }
    }

    componentDidMount() {
        fetch('/menu/getMenu')
          .then(response => response.json())
          .then((result) => {
            this.setState({
              isLoaded: true,
              data: result
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          });


          console.log("Loaded------>",this.state.error);
          console.log("Loaded------>",this.state.data);
      }

      changeOption(item){
          console.log("Change here");
          this.setState({selectedItem:item});

          console.log("selected -------->",this.state.selectedItem);
          console.log("state data-------->",this.state.data);

      }
      returnRate(item){
        for(let i=0;i<this.state.data.length;i++)
        {
          if(this.state.data[i].text===this.state.selectedItem){
           console.log(this.state.data[i].rate); 
           return this.state.data[i].rate;
            
          }
          
        }
      }
      valueChanged=(event)=>{
            console.log("Value is----------->",event.target.value);
           this.setState({qty:event.target.value});
      }
    render() {
        const options=[];
        for(let i=0;i<this.state.data.length;i++){
            var temp = this.state.data[i];
            temp.text=temp.name+"-"+temp.code;
            temp.key=temp.code;
            temp.flag=temp.code;
            temp.value=temp.code;
            options.push(temp);
        }

        console.log("Options------->",options);
    
        return (
            
            <div>
                
                <div>
                    <MutipleTable value={this.state.data}/>
                </div>


            </div>
        );
    }
}


export default Table;

