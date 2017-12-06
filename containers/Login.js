import React, { Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import { signIn ,get_userinfo} from '../apis/';
import { validPhone } from '../util/';


const app_id = "wx4a6ccdb9a09c5daa";

export default class Login extends Component {
  constructor(props,context) {
    super(props)
    this.state = {
      phone:'',
      password:'',
      errorinfo:''
    }
    this._user = this.props.user;
    this._router = context.router;
    this.handleLogin = this.handleLogin.bind(this);
    this.onChange = this.onChange.bind(this);
      this.get_code = this.get_code.bind(this);
      this.getUrlParameter = this.getUrlParameter.bind(this);
  }


    get_code(redirect_uri) {
        var redirect_uri = encodeURIComponent(redirect_uri);
        var auth_url_template = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + app_id + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
        window.location = auth_url_template;
        return;
    }


    getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };


  handleLogin(e){
    e.preventDefault();
    const { saveUser } = this.props;
    const { phone, password} = this.state;
    if(!validPhone(phone)){
      this.setState({
        errorinfo:'请输入正确的手机号'
      })
    }
    const query = {
      phone,
      password
    }
    signIn(query,(rlt)=>{
      if(rlt.code == '1000'){
          this._user.phone = phone;
          this._user.token = rlt.data.token;
          this._user.role_level = rlt.data.role_level;
          this._user.uid = rlt.data.uid;
          this._user.name = rlt.data.name;
          this._user.openid = rlt.data.openid;

          saveUser(this._user);
          console.log('signIn rlt', rlt);
          console.log('signIn this._user', this._user);
          sessionStorage.user = JSON.stringify(this._user);

          this._router.replace('/')
      }else{
        this.setState({
          errorinfo:rlt.message
        })
      }
    })
  }

  onChange(e){
    if(e.target.name == 'phone'){
      this.setState({phone: e.target.value});
    }else if(e.target.name === 'password'){
      this.setState({password: e.target.value});
    }
  }

  render(){
    const { phone, password, errorinfo } = this.state;
    return(
      <div id="wrapper" className="login-box">
        <div className="logo">
          <img src="/imgs/logo.png" alt=""/>
        </div>
        <form className="form-box" onSubmit={this.handleLogin}>
          <p className={classnames('error',errorinfo?null:'hide')}>{errorinfo}</p>
          <div className="input-box">
            <i className="t-icon-phone"></i>
            <input name="phone" type="text" placeholder="请输入手机号码" value={phone} onChange={this.onChange} />
          </div>
          <div className="input-box">
            <i className="t-icon-key"></i>
            <input name="password" type="password" placeholder="请输入密码" value={password} onChange={this.onChange}/>
          </div>
          <div className="clear"></div>
          <p className="sms-login sms-login-left"><Link to={{pathname:'loginsms'}} href="#">短信登陆</Link></p>
          <p className="sms-login sms-login-right"><Link to={{pathname:'wangjimima'}} href="#">忘记密码</Link></p>
          <div className="clear"></div>
          <button className="login-btn" type="submit" disabled={!phone || !password}>登 录</button>
          <button className="reg-btn" onClick={()=>{this._router.push('reg')}} type="button">注 册</button>
        </form>
      </div>
    )
  }
}

Login.contextTypes = {
	router: React.PropTypes.object.isRequired
};
