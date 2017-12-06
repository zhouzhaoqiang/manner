import React, { Component } from 'react';
import { sendSMS, regLoginBySMS } from '../apis/';
import { validPhone } from '../util/';

export default class LoginSms extends Component {
  constructor(props,context) {
    super(props)
    this.state = {
      phone:'',
      vcode:''
    }
    this._router = context.router;
    this.handleLogin = this.handleLogin.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getVcode = this.getVcode.bind(this);
  }

  handleLogin(e){
    e.preventDefault();
    const { phone, vcode } = this.state;
    const { saveUser } = this.props;
    if(!phone || !vcode){
      return;
    }
    const query = {
      phone,
      code:vcode,
      sms_type:'login'
    }
    regLoginBySMS(query,(rlt)=>{
      if(rlt.code == '1000'){
        saveUser({
          phone,
        	name:rlt.data.name,
        	token: rlt.data.token,
        	role_level: rlt.data.role_level,
        	uid:rlt.data.uid
        })
        alert('登陆成功');
        this._router.replace('/')
      }else{
        alert(rlt.message);
      }
    })
  }

  getVcode(){
    const { phone } = this.state;
    if(!validPhone(phone))return alert('清输入正确的手机号');
    const query = {
      phone,
      sms_type:'login'
    }
    sendSMS(query,(rlt)=>{
      if(rlt.code =='1000'){
        alert('发送验证码成功');
      }else{
        alert(rlt.message)
      }
    })
  }

  onChange(e){
    if(e.target.name == 'phone'){
      this.setState({phone: e.target.value});
    }else if(e.target.name === 'vcode'){
      this.setState({vcode: e.target.value});
    }
  }

  render(){
    const { phone, vcode } = this.state;
    return(
      <div id="wrapper" className="reg-box">
        <div className="logo">
          <img src="/imgs/logo.png" alt=""/>
        </div>
        <form className="form-box" onSubmit={this.handleLogin}>
          <div className="input-box">
            <i className="t-icon-phone"></i>
            <input type="tel" name="phone" placeholder="请输入手机号码" onChange={this.onChange} value={phone}/>
            <button type="button" className="ycode" onClick={this.getVcode}>获取验证码</button>
          </div>
          <div className="input-box">
            <i className="t-icon-key"></i>
            <input type="text" name="vcode" placeholder="请输入验证码" onChange={this.onChange} value={vcode}/>
          </div>
          <button className="reg-btn" type="submit">登 陆</button>
        </form>
      </div>
    )
  }
}

LoginSms.contextTypes = {
	router: React.PropTypes.object.isRequired
};
