import React, { Component } from 'react'
import classnames from 'classnames';
import './style.scss'

import { Link } from 'react-router'

export default class Menu extends Component {
  constructor(props) {
    super(props)
    console.log('222');
    console.log(sessionStorage.user);
    this._user = JSON.parse(sessionStorage.user);
  }
  /*render(){
    return(
      <footer className="footer">
        <Link to={{pathname:'/home'}} className="home"><i className="t-icon-home"></i></Link>
        <Link to={{pathname:'/goods/15'}} className="item"><span>电视保险</span></Link>
        <Link to={{pathname:'/activity'}} className="item"><span>活动专区</span></Link>
        <Link to={{pathname:'/cates'}} className="item"><span>商品分类</span></Link>
        <Link to={{pathname:'/vip'}} className="item"><span>VIP</span></Link>
        <Link to={{pathname:'/account'}} className="item"><span>我的</span></Link>
      </footer>
    )
  }*/

  render(){
    return(
      <footer className="footer">
        <Link to={{pathname:'/home'}} className="home"><i className="t-icon-home"></i></Link>
        <Link to={{pathname:'/goods/15'}} className="item"><span>电视保险</span></Link>
        <Link to={{pathname:'/activity'}} className="item"><span>活动专区</span></Link>
        <Link to={{pathname:'/cates'}} className="item"><span>商品分类</span></Link>
        {parseInt(this._user.role_level) == 0 ? "" :(<Link to={{pathname:'/vip'}} className="item"><span>VIP</span></Link>)}
        <Link to={{pathname:'/account'}} className="item"><span>我的</span></Link>
      </footer>
    )
  }
}
