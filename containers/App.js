import React, { Component,PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/index';
import { connect } from 'react-redux';
import _map from 'lodash/map';
import $ from 'jquery';

import { getDistrict,ImgHomeSy,Image_URL,API_URL,get_userinfo } from '../apis/'

const app_id = "wx4a6ccdb9a09c5daa";

class App extends Component{
  constructor(props,context) {
        super(props);
        this.state = {
          time:3,
          show:true,
        };
        this._router = context.router;
        this._user = this.props.user;
        this.logout = this.logout.bind(this);
        this.checkToken = this.checkToken.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
        this.imgHome = this.imgHome.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.showOnClick = this.showOnClick.bind(this);
        this.switch=false;
        this.path= "";
        if(this.props.user.role_level==null){
          this.props.user.role_level=0;
        }
        sessionStorage.user = JSON.stringify(this.props.user);
	}


  componentWillMount() {
      console.log('componentWillMount this._user', this._user);

      $.ajax({
          url: `${API_URL}setting/cpl`,
          type: "GET",
          success: (rlt) => {
              if (rlt.code == 1002) {
                  this.switch = false;
              } else {
                  this.switch = true;
                  this.path = rlt.data.value;
              }
          },
          async: false,
          error: function (er) {
              console.log(er);
          }
      });

  }

  componentDidMount(){
    //check url out back
      const { user, location } = this.props;
      console.log('check user is login ', user);

      window.onresize = () =>{
          document.documentElement.style.fontSize = window.innerWidth/3.75 + 'px';
      }


    //设置基础font-size
    document.documentElement.style.fontSize = window.innerWidth/3.75 + 'px';
    const { district, saveDistrict } = this.props;
    if(!district){
      getdistrict((dist)=>{
        saveDistrict({district:dist,})
      })
    }

    //$('toubao-Syyddh').
    let Time = setInterval(()=>{
      this.setState({
        time: --this.state.time,
      })
      if(this.state.time==0){
        clearInterval(Time);
        $('.toubao-Syyddh').hide();
      }
    },1000)

  }

  checkLogin(ispush){
    const { user, location } = this.props;
    if(!user.token){
      if(ispush){
        this._router.push({
          pathname: '/login',
          state: { nextPathname: location.pathname }
        })
      }else{
        this._router.replace({
          pathname: '/login',
          state: { nextPathname: location.pathname }
        })
      }
      return false;
    }
    return true;
  }



  logout(){
    const { deleteUser } = this.props;
    deleteUser();
    this._router.replace('/login')
  }

  checkToken(data){
		if(data.code =='1009'){
			this.logout()
		}
	}

  imgHome() {
    // ImgHomeSy({a:1},(rlt)=>{
    //   this.path= rlt.value;
    //   console.log(this.path);
    // })

  }

  showOnClick() {
    this.setState({
      show: false,
    })
  }

  render(){
    let obj= {
       "position":"absolute",
       "top": "5px",
       "right": "5px",
      "float":"right",
      "width":"30px",
      "height":"30px",
      "zIndex":1003,
      "borderRadius": "50%",
      "background": "rgba(0,0,0,.2)",
      "color": "#fff",
      "font":"12px/30px '微软雅黑'",
      "textAlign":"center",
      "boxShadow": "0 0 50px .1px #000",
    }
    const { children,user,saveUser,district } = this.props;
    return(
      <div>
        {
          //this.state.time==3?this.imgHome():null
          //this.state.show?<p style={obj} onClick={ this.showOnClick } >关闭</p>:null
        }
        {
            //console.log(this.switch)
           this.props.location.pathname=="/"&&this.props.location.action=="POP"&&this.switch?(
          // <div className="toubao-Syyddh"  >
            this.state.show?<div style={{
               "position": "fixed",
               "top": 0, "left": 0,
               "width":"100%",
               "height": $(window).height()+"px",
               "padding": "80px 30px",
               "zIndex": 1001,
               "background": "rgba(0,0,0,.2)",
              }} >
              <div style={{"width":"100%","height":"100%","position": "relative" }}>
                <p style={obj} onClick={ this.showOnClick } >关闭</p>
                <img src={ `${Image_URL}/${this.path}` } style={{
                  "width":"100%",
                  "height": "100%",
                  "boxShadow": "0 0 100px .1px #000",
                    }}/>
              </div>
            </div>:null):null
          // </div>:null
        }
        {
          React.cloneElement(children, {key: location.key,user,checkToken:this.checkToken,saveUser,checkLogin:this.checkLogin,district,logout:this.logout})
        }
      </div>
    )
  }
}

App.contextTypes = {
	router: React.PropTypes.object.isRequired
};

function getdistrict(callback){
  let d0tmp,d1tmp,districts = [];
  getDistrict((rlt)=>{
    _map(rlt,(t1,i1)=>{
      d1tmp = [];
      _map(t1.childrens,(t2,i2)=>{
        d0tmp = [];
        _map(t2.childrens,(t3,i3)=>{
          d0tmp.push({
            value:t3.district_id,
            text:t3.name
          })
        })
        d1tmp.push({
          value:t2.district_id,
          text:t2.name,
          children:d0tmp
        })
      })
      districts.push({
        value:t1.district_id,
        text:t1.name,
        children:d1tmp
      })
    })
    callback(districts)
  })

}


function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}


export default connect((state)=>({
  user:state.user,
  district: state.district
}) ,mapDispatchToProps)(App);
