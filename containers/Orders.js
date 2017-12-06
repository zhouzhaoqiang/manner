import React, { Component } from 'react';
import NavBar from '../components/NavBar/NavBar';
import iScroll from 'iscroll';
import ReactIScroll from 'react-iscroll';
import classnames from 'classnames';
import { Link } from 'react-router';
import _map from 'lodash/map';

import { getOrdersList, Image_URL } from '../apis/'

const iScrollOptions = {
  mouseWheel: true,
  scrollbars: false,
  click:true
}

const imageview = '?imageView2/0/w/100/h/100';

export default class Orders extends Component {
  constructor(props,context) {
    super(props)
    this.state = {
      data: [],
    }
    this._data = null;
    this._user = this.props.user;
    this._checkToken = this.props.checkToken;
    this._router = context.router;
    this._isMounted = true;
    this.goBack = this._router.goBack;
    this.getOrders = this.getOrders.bind(this);
    this.goPayOrder = this.goPayOrder.bind(this);
  }

  componentWillMount(){
    this._isMounted = this.props.checkLogin()
    this.getOrders()
  }

  getOrders(){
    const query = {
      token:this._user.token
    }
    getOrdersList(query,(rlt)=>{
      this._checkToken(rlt)
      if(rlt.code == '1000'){
        this._data = rlt.data;
        console.log('orders rlt.data', rlt.data);
        this.setState({
          data:this._data
        })
      }
    })
  }



  goPayOrder(t){
    this._router.push(`/extraprice/${t.order_id}`)
      return;
  }



  renderOrders(){
    let goods;
    let This=this;
    return _map(this.state.data,(t,i)=>{
      goods = t.details[0];
      if(!goods)return;
      return(
        <li className="order-item" key={`order_${t.order_id}`} onClick={ ( e )=>{
            e.stopPropagation();
            t.state==0?This.goPayOrder(t):(t.state==3||t.state==2?This._router.push(`/account/orders/${t.order_id}`):null);
          }
        }>
          <img className="item-image" src={`${Image_URL}${goods.goods.pic}${imageview}`} alt=""/>
          <div className="center">
            <p className="name">{goods.goods.name}</p>
            <span className="time">{t.create_at}</span>
          </div>
          <div className="right">
            <span className="price">{`￥${t.amount}`}</span>
            <span className="freight">运费：免运费</span>
            <span className="num">x1</span>
            {t.state==0?<button className="opra-btn" >去支付</button>:(t.state==3?<button className="opra-btn" >已发货</button>:(t.state==2?<button className="opra-btn"  >未发货</button>:null))}
          </div>
        </li>
      )
    })
  }

  render(){

    const leftNav = {
      icon:'t-icon-angle-left',
      onClick:this.goBack
    }
    const rightNav = {
      icon:'t-icon-angle-left',
      style:{opacity:0}
    }
    if(!this._isMounted) return null;
    return(
      <div className="wrapper order-list-box bg-gray-lighter">
        <NavBar
          className="bg-gray-lighter"
          title="我的订单"
          leftNav={leftNav}
          rightNav={rightNav}
          style={{borderBottom:'1px solid #ccc'}}
          />
        <ReactIScroll
          ref={(r)=>{
            this._iScroll = r;
          }}
          iScroll={iScroll}
          options={iScrollOptions}
          >
          <ul className="order-list">
            {this.renderOrders()}
          </ul>
        </ReactIScroll>

      </div>
    )
  }
}

Orders.contextTypes = {
	router: React.PropTypes.object.isRequired
};
