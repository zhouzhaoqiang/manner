import React, { Component } from 'react';
import NavBar from '../components/NavBar/NavBar';
import { Link } from 'react-router';

export default class UserInfo extends Component {
  constructor(props,context) {
    super(props)
    this._user = this.props.user;
    this._checkToken = this.props.checkToken;
    this._router = context.router;
    this.goBack = this._router.goBack;
    this.onClickSignOut= this.onClickSignOut.bind(this);
  }

  componentWillMount(){
    this.props.checkLogin()
  }


  onClickSignOut() {
    if (confirm("你确定要退出该账号吗？")) {
      const { logout } = this.props;
      logout();
    }
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
    return(
      <div id="wrapper" className="userinfo-box bg-gray-lighter">
        <NavBar
          className="bg-gray-lighter"
          title="我的资料"
          leftNav={leftNav}
          rightNav={rightNav}
          />
        <ul className="userinfo-list">
          <li className="item" key={ "qwe"+1 } >
            <i className="t-icon-user-dark"></i>
            <span className="title">用户名</span>
            <span className="right">{this._user.name}</span>
          </li>
          <li className="item" key={ "qwe"+2 }>
            <i className="t-icon-phone-dark "></i>
            <span className="title">手机号码</span>
            <span className="right">{this._user.phone}</span>
          </li>
          <li className="item"key={ "qwe"+3 } >
            <Link to={{pathname:'/account/address'}}>
              <i className="t-icon-address-dark"></i>
              <span className="title">收货地址</span>
              <i className="t-icon-arrow-right right"></i>
            </Link>
          </li>
          <li className="item" key={ "qwe"+4 }>
            <Link to={{pathname:'xiugaimima'}}>
              <i className="iconfont">&#xe601;</i>
              <span className="title">修改密码</span>
              <i className="t-icon-arrow-right right"></i>
            </Link>
          </li>
          <li className="item" onClick= { this.onClickSignOut.bind( this ) } key={ "qwe"+5 } >
              <i className="iconfont">&#xe600;</i>
              <span className="title">退出登录</span>
          </li>
        </ul>
      </div>
    )
  }
}


UserInfo.contextTypes = {
	router: React.PropTypes.object.isRequired
};
