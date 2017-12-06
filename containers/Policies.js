import React, { Component } from 'react';
import NavBar from '../components/NavBar/NavBar';
import iScroll from 'iscroll';
import ReactIScroll from 'react-iscroll';
import classnames from 'classnames';
import { Link } from 'react-router';
import _map from 'lodash/map';

import { getPolicies, Image_URL } from '../apis/'

const iScrollOptions = {
  mouseWheel: true,
  scrollbars: false,
  click:true
}

export default class Policies extends Component {
  constructor(props,context) {
    super(props)
    super(props)
    this.state = {
      data: [],
    }
    this._data = null;
    this._isMounted = true;
    this._user = this.props.user;
    this._checkToken = this.props.checkToken;
    this._router = context.router;
    this.goBack = this._router.goBack;
  }

  componentWillMount(){
    this._isMounted = this.props.checkLogin()
    const query = {
      token:this._user.token
    }
    getPolicies(query,(rlt)=>{
      this._checkToken(rlt);
      if(rlt.code == '1000'){
        this.setState({
          data:rlt.data
        })
      }
    })
  }

  renderPolicies(){
    //姓名 手机号 金额 车牌号 车型号 交强险号 商业险 时间
    return _map(this.state.data,(t,i)=>{
      return (
        <li className="policies-item" key={`policies_${t.policy_id}`}>
          <p><span className="name">{t.name}</span><span className="phone">{t.phone}</span><span className="license_plate">{t.license_plate}</span></p>
          <p><span className="car_type">{t.car_type}</span><span className="vci">交强险：{t.vci}</span><span className="tci">商业险：{t.tci}</span></p>
          <p><span className="time">{t.create_at}</span></p>
          <span className="amount">{t.amount}</span>
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
      <div id="wrapper" className="policies-list-box bg-gray-lighter">
        <NavBar
          className="bg-gray-lighter"
          title="我的保单"
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
          <ul className="policies-list">
            {this.renderPolicies()}
          </ul>
        </ReactIScroll>

      </div>
    )
  }
}

Policies.contextTypes = {
	router: React.PropTypes.object.isRequired
};
