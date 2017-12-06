import React, { Component } from 'react';
import NavBar from '../components/NavBar/NavBar';
import iScroll from 'iscroll';
import ReactIScroll from 'react-iscroll';
import { Link } from 'react-router';
import classnames from 'classnames';
import _map from 'lodash/map';

import { getAddressesList, delAddresses } from '../apis/'

const iScrollOptions = {
  mouseWheel: true,
  scrollbars: false,
  click: true
}

export default class Address extends Component {
  constructor(props,context) {
    super(props)
    this.state = {
      data:[],
      edit:false
    }
    this._user = this.props.user;
    this._checkToken = this.props.checkToken;
    this._router = context.router;
    this.goBack = this._router.goBack;
    this._isMounted = true;
    this.openEdit = this.openEdit.bind(this);
    this.newAddress = this.newAddress.bind(this);
    this.getAddrList = this.getAddrList.bind(this);
  }

  componentWillMount(){
    this.props.checkLogin()
    this.getAddrList()
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  getAddrList(){
    const query = {
      token:this._user.token
    }
    getAddressesList(query,(rlt)=>{
      this._checkToken(rlt)
      if(rlt.code == '1000'){
        this.setState({
          data:rlt.data
        })
      }

    })
  }

  openEdit(){
    this.setState({
      edit:!this.state.edit
    })
  }

  deleteItem(item){
    const id = item.address_id;
    const query = {
      token:this._user.token,
      id,
    }
    delAddresses(query,(rlt)=>{
      this._checkToken(rlt)
      if(rlt.code == '1000'){
        let data = [].concat(this.state.data);
        _map(this.state.data,(t)=>{
          if(t.address_id == id)data.push(t)
        })
        this.setState({
          data,
          edit:false
        })
        this.getAddrList()
      }
    })

  }

  newAddress(){
    const {router} = this.context;
    router.push('/account/address/add')
  }

  renderItems(){
    const { data, edit } = this.state;
    let items = [];
    _map(data,(t,i)=>{
      items.push(
        <li className={classnames('address-item',edit?'active':null)} key={`address_${t.address_id}`}>
          <div className="delete" onClick={this.deleteItem.bind(this,t)}><i className="t-icon-delete-red" ></i></div>
          <Link to={{pathname:`/account/address/${t.address_id}`,state:t}}  className="address-item-link" >
            <div className="content">
              <p><span className="name">{t.name}</span><span className="phone">{t.phone}</span></p>
              <p className="address"><span>{`${t.district[1][0]}`}</span><span>{`${t.district[1][1] || ''}`}</span><span>{`${t.district[1][2] || ''}`}</span><span>{t.address}</span></p>
            </div>
            <div className="right"><i className="t-icon-arrow-right"></i></div>
          </Link>
        </li>
      )
    })
    return (<ul className="address-list">{items}</ul>)
  }

  render(){
    const { edit } = this.state;
    const leftNav = {
      icon:'t-icon-angle-left',
      onClick:this.goBack
    }
    const rightNav = {
      title:edit?'完成':'编辑',
      onClick:this.openEdit
    }
    return(
      <div id="wrapper" className="user-address-box bg-gray-lighter">
        <NavBar
          className="bg-gray-lighter"
          title="地址管理"
          leftNav={leftNav}
          rightNav={rightNav}
          />
        <ReactIScroll
          ref={(r) => {
            this._iScroll = r;
          }}
          iScroll={iScroll}
          options={iScrollOptions}
          >
          {this.renderItems()}
        </ReactIScroll>
        <button className="new-address" onClick={this.newAddress}>新增收货地址</button>
      </div>
    )
  }
}

Address.contextTypes = {
	router: React.PropTypes.object.isRequired
};
