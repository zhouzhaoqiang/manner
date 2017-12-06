import React, { Component } from 'react';
import { Link } from 'react-router';
import { validPhone } from '../util/';
import { sendSMS , dxxgLoginBySMS } from '../apis/';

export default class Reg extends Component {
  constructor(props,context) {
    super(props)
    this.state = {
      phone:"",
      vcode:'',
      name:"",
    }
    this._router = context.router;
    this.handleReg = this.handleReg.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getVcode = this.getVcode.bind(this);
  }

  handleReg(e){
    e.preventDefault();
    const { phone, vcode, name } = this.state;
    const { saveUser } = this.props;
    if(!phone || !vcode || !name){
      return;
    }

    var reg = /[^u4e00-u9fa5]/;
    //var reg = new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3])*$");

    if(!name){
      alert("亲,密码不能为空!")
      return;
    }
    else if (name.length<6) {
      alert("亲,密码位数不能小于6位噢!")
      return;
    }
    else if (name.length>20) {
      alert("亲,密码位数不能大于20位,我们怕亲记不住!")
      return;
    }
    else if (reg.test(name)) {
      alert("亲,不要淘气,你见过谁家密码可以输入汉字的,不可以噢!")
      return;
    }

    if(!vcode){
      alert("亲,验证码不能为空!")
      return;
    }
    else if (vcode.length<4) {
      alert("亲,验证码位数不能小于4位噢!")
      return;
    }
    else if (vcode.length>10) {
      alert("亲,我们没有发过位数超过10位的验证码，请认真填写!")
      return;
    }
    else if (reg.test(vcode)) {
      alert("亲,不要淘气,你见过谁家验证码可以输入汉字的,不可以噢!")
      return;
    }

    if(!phone){
      alert("亲,手机号不能为空!")
      return;
    }
    else if (phone.length<10) {
      alert("亲,手机号位数不能小于10位噢!")
      return;
    }
    else if (reg.test(phone)) {
      alert("亲,不要淘气,你见过谁家手机号可以输入汉字的,不可以噢!")
      return;
    }

    var query = {
        phone,
        password:name,
        code:vcode,
      }

    dxxgLoginBySMS(query,(rlt)=>{
      console.log(rlt)
      if(rlt.code == '1000'){
        alert('修改密码成功！新密码为'+name+',请妥善保管！');


        this._router.replace('/');
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
      sms_type:'forgot'
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
    }else if(e.target.name === 'name'){
      this.setState({name: e.target.value});
    }
  }

  render(){
    const { phone, vcode, name } = this.state;
    return(
      <div id="wrapper" className="reg-box">
        <div className="logo">
          <img src="/imgs/logo.png" alt=""/>
        </div>
        <form className="form-box" onSubmit={this.handleReg}>
          <div className="input-box">
            <i className="t-icon-phone"></i>
            <input type="tel" name="phone" placeholder="请输入手机号码" onChange={this.onChange} value={phone}/>
            <button className="ycode" onClick={this.getVcode}>获取验证码</button>
          </div>
          <div className="input-box">
            <i className="t-icon-key"></i>
            <input type="text" name="vcode" placeholder="请输入验证码" onChange={this.onChange} value={vcode}/>
          </div>



          <div className="input-box">
            <i className="t-icon-user"></i>
            <input type="text" name="name" placeholder="请输入新密码" onChange={this.onChange} value={name}/>
          </div>



          <button className="reg-btn" type="submit">确 定</button>
        </form>
      </div>
    )
  }
}

Reg.contextTypes = {
	router: React.PropTypes.object.isRequired
};
