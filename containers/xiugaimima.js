import React, { Component } from 'react';
import { Link } from 'react-router';
import { validPhone } from '../util/';
import { sendSMS, xgLoginBySMS } from '../apis/';

export default class Reg extends Component {
  constructor(props,context) {
    super(props)
    this.state = {
      name:"",
    }
    this._checkToken = this.props.checkToken;
    this._router = context.router;
    this.handleReg = this.handleReg.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleReg(e){
    e.preventDefault();
    let { name } = this.state;
    const { saveUser , user } = this.props;


    let Trim = (str,is_global)=>{
      var result;
      result = str.replace(/(^\s+)|(\s+$)/g,"");
      if(is_global.toLowerCase()=="g")
      {
          result = result.replace(/\s/g,"");
       }
      return result;
    }

    name = Trim( name , "g" );

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
    let query = {
        token: user.token,
        password:name,
      }
      console.log(query);
    xgLoginBySMS(query,(rlt)=>{
      console.log(rlt)
      this._checkToken(rlt);
      if(rlt.code == '1000'){
        alert('修改密码成功！新密码为'+name+',请妥善保管！');
        this._router.replace('/');
      }else{
        alert(rlt.message);
      }
    })
  }


  onChange(e){
    if(e.target.name === 'name'){
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
            <i className="t-icon-user"></i>
            <input type="text" name="name" placeholder="请输入新密码"  onChange={this.onChange} value={name}/>
          </div>



          <button className="reg-btn" type="submit">确定修改</button>
        </form>
      </div>
    )
  }
}

Reg.contextTypes = {
	router: React.PropTypes.object.isRequired
};
