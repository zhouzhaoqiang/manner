import React, { Component } from 'react';
import iScroll from 'iscroll';
import ReactIScroll from 'react-iscroll';
import NavBar from '../components/NavBar/NavBar';
import Modal from '../components/Modal/Modal'
import { Link } from 'react-router';
import classnames from 'classnames';
import _map from 'lodash/map';

import { getGoodsDetail, getAddressesList, getVouchersList, placeOrders, Image_URL } from '../apis/'

const imageview = '?imageView2/0/w/100/h/100';

const iScrollOptions = {
  mouseWheel: true,
  scrollbars: false,
  click:true
}

export default class FirmOrder extends Component {
  constructor(props,context) {
    super(props,context)
    this.state = {
      visiable:false,
      visiableaddrlist:false,
      goods:props.location.state,
      address:null,
      addresslist:[],
    }
    this._router = context.router;
    this.goBack = this._router.goBack;
    this._user = this.props.user;
    this._checkToken = this.props.checkToken;
    this._isMounted = true;
    this._editId = props.params.id;
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getGoods = this.getGoods.bind(this);
    this.openAddressList = this.openAddressList.bind(this);
    this.closeAddressList = this.closeAddressList.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.exChange = this.exChange.bind(this);
  }

  componentWillMount(){
    this.props.checkLogin()
    this.getGoods()
    const query = {
      token:this._user.token
    }
    getAddressesList(query,(rlt)=>{
      this._checkToken(rlt)
      if(rlt.code == '1000'){
        this.setState({
          addresslist:rlt.data
        })
      }
    })
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  getGoods(){
    const query = {
      query:{
        goods_id:this._editId
      }
    }
    getGoodsDetail(query,(rlt)=>{
      if(rlt.code == '1000'){
        this.setState({
          goods:rlt.data[0]
        })
      }
    })
  }

  openModal(){
    this.setState({
      visiable:true
    })
  }

  closeModal(){
    this.setState({
      visiable:false
    })
  }

  openAddressList(){
    this.setState({
      visiableaddrlist:true
    })

  }

  closeAddressList(){
    this.setState({
      visiableaddrlist:false
    })
  }


  changeAddress(address){
    this.setState({
      address,
      visiableaddrlist:false
    })
  }

  renderGoods(){
    const { goods } = this.state;
    return goods?(
      <Link to="" className="goods-item" >
        <img className="goods-img" src={`${Image_URL}${goods.pic}${imageview}`} alt=""/>
        <div className="goods-info">
          <p className="title">{goods.name}</p>
          <p className="price-num"><span className="price">{`￥${goods.amount}`}</span><span className="num">x1</span></p>
          <p className=""><span className="freight">运费：免运费</span><span className="amount">合计：<em>{`￥${goods.amount}`}</em></span></p>
        </div>
      </Link>
    ):null
  }

  renderAddressList(){
    return _map(this.state.addresslist,(t,i)=>{
      let taddr = '';
      _map(t.district[1],(t1)=>{
        taddr += t1 + ' ';
      })
      t.taddr = taddr +  t.address;
      return (
        <div className="address-select" key={`address_${t.address_id}`} onClick={this.changeAddress.bind(this,t)}>
          <i className="t-icon-address"></i>
          <i className="t-icon-arrow-right"></i>
          <div className="content">
            <p className="name-phone">收货人：<span className="name">{t.name}</span><span className="phone">{t.phone}</span></p>
            <p >收货地址：<span className="adderss">{t.taddr}</span></p>
          </div>
        </div>
      )
    })

  }

  renderAddress(){
    const { address } = this.state;
    return address?(
      <div className="address-select" onClick={this.openAddressList}>
        <i className="t-icon-address"></i>
        <i className="t-icon-arrow-right"></i>
        <div className="content">
          <p className="name-phone">收货人：<span className="name">{address.name}</span><span className="phone">{address.phone}</span></p>
          <p >收货地址：<span className="adderss">{address.taddr}</span></p>
        </div>
      </div>):(
        <div className="address-select" onClick={this.openAddressList}><p className="address-notice">请选择收货地址</p></div>
      )
  }




  exChange(){
    const { address, goods} = this.state;
    if(!address) return alert('请选择地址');
    if(!goods) return alert('请选择商品');
    const query = {
      token:this._user.token,
      data:{
        details:[{goods_id:goods.goods_id,qty:1}],
        address_id:address.address_id
      }
    }
    placeOrders(query,(rlt)=>{
      this._checkToken(rlt)
      if(rlt.code == '1000'){
        alert('下单成功')
        this._router.push(`/extraprice/${rlt.data.order_id}`)
      }else{
        alert('下单失败')
      }
    })
  }

  render(){
    const { visiable, visiableaddrlist, addresslist } = this.state;
    const leftNav = {
      icon:'t-icon-angle-left',
      onClick:this.goBack
    }
    const addrleftNav = {
      icon:'t-icon-angle-left',
      onClick:this.closeAddressList
    }
    const rightNav = {
      icon:'t-icon-angle-left',
      style:{opacity:0}
    }
    return(
      <div id="wrapper" className="firmorder-box bg-gray-lighter">
        <NavBar
          className="bg-gray-lighter"
          title="确认订单"
          leftNav={leftNav}
          rightNav={rightNav}
          />
        <div className="firmorder-content">
          {this.renderAddress()}
          {this.renderGoods()}
        </div>
        <button className="convert-btn" onClick={this.exChange}>立即兑换</button>
        <div className={classnames('address-select-box',visiableaddrlist?'active':'')}>
          <NavBar
            className="bg-gray-lighter"
            title="选择收货地址"
            leftNav={addrleftNav}
            rightNav={rightNav}
            />
          {addresslist.length>0?this.renderAddressList():(
            <Link to={{pathname:'account/address/add'}} className="newaddress-link">添加地址</Link>
          )}
        </div>
      </div>
    )
  }
}

FirmOrder.contextTypes = {
	router: React.PropTypes.object.isRequired
};
