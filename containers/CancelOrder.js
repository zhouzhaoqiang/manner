import React, { Component } from 'react';
import NavBar from '../components/NavBar/NavBar';

export default class CancelOrder extends Component {
  constructor(props,context) {
    super(props)
    this.state = {
      num:0
    }
    this.goBack = this.goBack.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this)
    this.textChange = this.textChange.bind(this)
  }

  goBack(){
    const { router } = this.context;
    router.goBack();
  }

  cancelOrder(){
    //do something
    this.goBack()
  }

  textChange(){
    let value = this._textarea.value;
    if(value.length>200){
      this._textarea.value = value.substr(0,200);
    }
    const num = this._textarea.value.length;
    this.setState({
      num,
    })
  }

  render(){
    const leftNav = {
      icon:'t-icon-angle-left',
      onClick:this.goBack
    }
    const rightNav = {
      title:'确定',
      onClick:this.cancelOrder
    }
    return(
      <div id="wrapper" className="order-cencel-box bg-gray-lighter">
        <NavBar
          className="bg-gray-lighter"
          title="取消订单"
          leftNav={leftNav}
          rightNav={rightNav}
          style={{borderBottom:'1px solid #ccc'}}
          />
        <div className="textarea">
          <textarea ref={(r)=>{ this._textarea = r}} cols="10" rows="10" onChange={this.textChange}></textarea>
          <span><em>{this.state.num}</em>/200</span>
        </div>
      </div>
    )
  }
}

CancelOrder.contextTypes = {
	router: React.PropTypes.object.isRequired
};
