import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Menu from '../../components/Menu'
import classnames from 'classnames';
import { Link } from 'react-router';
import _map from 'lodash/map';

import './style.scss';

import { getPoints } from '../../apis/'

export default class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      points:''
    }
    this._user = props.user;
    this.goLogin = this.goLogin.bind(this);
  }

  componentWillMount(){
    const query = {
      token:this._user.token
    }
    getPoints(query,(rlt)=>{
      if(rlt.code == '1000'){
        this.setState({
          points:rlt.data.points
        })
      }
    })
  }

  renderItems(){
    //{id:3,icon:'aquestion',title:'帮助中心',link:''}
    const { points } = this.state;
    const menus = [
      {id:1,icon:'points',title:'我的积分',link:'account/pointslogs',text:true},
      {id:2,icon:'apackage',title:'我的订单',link:'account/orders'},
      {id:3,icon:'acard',title:'我的卡券',link:'account/coupons'},
      {id:4,icon:'apolicies',title:'我的保单',link:'account/policies'}
    ];
    let lists = [];
    _map(menus,(t,i)=>{
      lists.push(
        <li className="item" key={i}>
          <Link to={{pathname:t.link}} >
            <i className={`t-icon-${t.icon}`}></i>
            <i className="t-icon-arrow-right right"></i>
            <span className="title">{t.title}</span>
            {t.text?<span className="text">{points}</span>:null}
          </Link>
        </li>
      )
    })
    return (<ul className="menu-list">{lists}</ul>)
  }

  goLogin(){
    const { checkLogin } = this.props;
    checkLogin(true)
  }

  render(){
    return(
      <div id="wrapper" className="account-box bg-gray-lighter">
        <header className="account-header">
          <Link to={{pathname:'account/userinfo'}}><i className="t-icon-setting"></i></Link>
          <div className="avatar" >
            <img src="/imgs/avatar1.png" alt=""/>
            <h4 onClick={this.goLogin}>{this._user.name?this._user.name:'未登录'}</h4>
          </div>
        </header>
        {this.renderItems()}
        <Menu />
      </div>
    )
  }
}
