import React, { Component } from 'react';
import Dropdown from '../DropDown/Dropdown';
import './Table-style.css';
import './Multiple-Table.css';

const techCompanies = [
  { label: "Apple", value: 1 },
  { label: "Facebook", value: 2 },
  { label: "Netflix", value: 3 },
  { label: "Tesla", value: 4 },
  { label: "Amazon", value: 5 },
  { label: "Alphabet", value: 6 },
];

export default class MutipleTable extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedItem:{},
            qty:1,
            total: 0,
            value: 0,
            quantity: 0,
            items: [ ],
            selectedItems: [],
            tableItems:[
              {
                rowId:0,
                optionSelected:"",
                rate:0,
                qty:1
            },
            {
              rowId:1,
              optionSelected:"",
              rate:0,
              qty:1
          }, {
            rowId:2,
            optionSelected:"",
            rate:0,
            qty:1
        }, {
          rowId:3,
          optionSelected:"",
          rate:0,
          qty:1
      },
      {
        rowId:4,
        optionSelected:"",
        rate:0,
        qty:1
    }
          ],
            item: {
                id: 0,
                name: "",
                quantity: 0,
                rate: 0,
                total: 0
            },
            rates:[],
            rowInfo:[]
                }
    }

    componentDidMount() {
        fetch('/menu/getMenu')
          .then(response => response.json())
          .then((result) => {
            this.setState({
              
                items: result
                ,selectedItems:result
            });
            
          },
          
          (error) => {
            this.setState({
              error
            });
          });

         
          

    }

   
    changeOption(currentSelection,rowId){
       console.log("Change Option",currentSelection,rowId);
       var temp=this.state.items;
       console.log("All--------->",temp);
       var currenItem = this.state.items.find(data => data.name+"-"+data.code==currentSelection);
       console.log("currenItem--------->",currenItem);
      //  currenItem.rate=temp.find(data => (data.name+"-"+data.code)==currentSelection).rate;
       console.log("currenItem update1--------->",currenItem);
      
       this.setState({selectedItem:currenItem});
       var tableItemsCopy = this.state.tableItems;
       tableItemsCopy[rowId].optionSelected = currenItem.name;
       tableItemsCopy[rowId].rate = currenItem.rate;
       tableItemsCopy[rowId].qty = 1;

       this.setState({
         tableItems:tableItemsCopy
       });
    console.log("tableItems------->",this.state.tableItems)

    }
    valueChanged=(event)=>{
        console.log("Value is----------->",this.state.selectedItems);
       this.setState({qty:event.target.value});
       var temp =this.state.tableItems;
       var obj={};
       obj.id=event.target.parentNode.parentNode.rowIndex;
       obj.name=this.state.selectedItem;
       obj.qty=event.target.value;
    //    obj.rate=returnRate(this.selectedItem);
       for(let i=0;i<temp.length;i++)
    {
      if( i===event.target.parentNode.parentNode.rowIndex-1){
       console.log(temp[i].rate); 
        temp[i].qty = event.target.value;
       break;
        
      }
      
    }
 
       this.setState({
        tableItems:temp
       });
       console.log("Selected Item --------->",this.state.tableItems);
  }

  returnRate(item){
    var temp =this.state.selectedItems;
    for(let i=0;i<temp.length;i++)
    {
      if(i===item){
       console.log(temp[i].rate); 
       return this.state.selectedItems[i].rate;
        
      }
      
    }
  }

  returnPrice(rate,item){
    for(let i=0;i<this.state.tableItems.length;i++)
    {
      if( i===item){
       console.log(this.state.tableItems[i].rate); 
       if(isNaN(rate * this.state.tableItems[i].qty))
       return 0;
       else{
        return rate * this.state.tableItems[i].qty;
       }
      
        
      }
      
    }
  }
  showRate(data,event){
    return this.state.rowInfo.rate;
  }

  changeAction=(event)=>{
      console.log("Clicked!");
  }
  addRows=(event)=>{
    console.log("Add row Action");
    var temp=this.state.tableItems;
    for(var i=0;i<2;i++){
    var newRows = {
      rowId:this.state.tableItems.length+1,
        optionSelected:"",
        rate:0,
        qty:1
    }
    temp.push(newRows);
  }
    this.setState({tableItems:temp});
  }
    render(){
        let count=5;
        const options=[];
        for(let i=0;i<this.state.items.length;i++){
            var temp = this.state.items[i];
            temp.text=temp.name+"-"+temp.code;
            temp.key=temp.code;
            temp.flag=temp.code;
            temp.value=temp.code;
            options.push(temp);
        }

        return(

          <div>

            <table id="customers">
            <thead>
            <tr>
                <th>S no</th>
                <th>Item Name/Item Code</th>
                <th>Qty</th>
                <th>Rate/Qty</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
         
                   {this.state.tableItems.map((row,index)=>{
                       return (
                        
                        <tr key={row.id } onClick={this.changeAction}>
                          <td class="counterCell"></td>
                            <td>
                                <Dropdown className="dropDown"
                             placeholder='Select Item'
                             fluid
                             search
                             selection
                             options={options}
                             changed={this.changeOption.bind(this)}
                             rowId={index}
                             />
                             </td>  
                            <td>
                                 
                                 <input type="number" defaultValue="1" min="1" onChange={this.valueChanged}/>
                             
                            </td>
                            <td>
                            {row.rate==""|| row.rate==0 ? 0 : row.rate}
                             
                             </td>
                             <td>
                                 {this.returnPrice(row.rate,index)}
                             </td>
                             
                        </tr>
                    )
                   })}
                     
                
                
            </tbody>
        </table>

        <button id="addBtn" onClick={this.addRows}>Add Rows</button>
        </div>

        );
    }
}