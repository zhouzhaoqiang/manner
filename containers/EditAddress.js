import React, { Component } from 'react';
import NavBar from '../components/NavBar/NavBar';
import { CityPicker } from 'react-pickers';
import classnames from 'classnames';
import _map from 'lodash/map';
import _trim from 'lodash/trim';

import { getAddresses, editAddresses, addAddresses } from '../apis/'
import { validPhone } from '../util/';


export default class EditAddress extends Component {
  constructor(props,context) {
    super(props)
    const state = props.location.state;
    if(state){
      this.state = {
        visible:false,
        phone: state.phone,
        name:state.name,
        district_id:state.district_id,
        districts:state.district,
        address:state.address,
        isPickerShow:false,
      }
    }else{
      this.state = {
        visible:false,
        phone: '',
        name:'',
        district_id:'',
        districts:[],
        address:'',
        isPickerShow:false,
      }
    }
    this._user = this.props.user;
    this._checkToken = this.props.checkToken;
    this._router = context.router;
    this.goBack = this._router.goBack;
    this._district = this.props.district;
    this._isMounted = true;
    this._editId = this.props.params.id;
    this._isNew = this._editId == 'add';
    this.getAddr = this.getAddr.bind(this);
    this.showPicker = this.showPicker.bind(this);
    this.cancelPicker = this.cancelPicker.bind(this);
    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount(){
    this.props.checkLogin()
    if(!this._isNew)this.getAddr()
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  getAddr(){
    const query = {
      token:this._user.token,
      id:this._editId
    }
    getAddresses(query,(rlt)=>{
      this._checkToken(rlt)
      if(rlt.code == '1000'){
        this.setState({
          phone:rlt.data.phone,
          name:rlt.data.name,
          district_id:rlt.data.district_id,
          districts:rlt.data.district,
          address:rlt.data.address
        })
      }
    })

  }

  showPicker(){
    this.setState({
      visible:true
    })
  }

  cancelPicker(){
    this.setState({
      visible:false
    })
  }

  getData(dists){
    let districts = [],tmp1 = [],tmp2 = [];
    let district_id;
    _map(dists,(t)=>{
      tmp1.push(t.value);
      tmp2.push(t.text)
      if(t.value) district_id = t.value;
    })
    districts.push(tmp1,tmp2);
    this.setState({
      districts,
      district_id
    })
  }

  handleChange(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  handleSubmit(){
    const { name, phone, address,district_id } = this.state;
    if(_trim(name) == ''){
      return alert('请填写姓名')
    }else if(!validPhone(phone)){
      return alert('请填写正确的手机号')
    }else if(!district_id){
      return alert('请选择地区')
    }else if(!_trim(address)){
      return alert('请填写地址')
    }
    const query = {
      token:this._user.token,
      data:{
        name,
        phone,
        district_id,
        address
      }
    }
    if(this._isNew){
      addAddresses(query,(rlt)=>{
        this._checkToken(rlt)
        if(rlt.code == '1000'){
          alert('保存成功')
        }else{
          alert('保存失败'+rlt.message)
        }
      })
    }else{
      query.id = this._editId;
      editAddresses(query,(rlt)=>{
        this._checkToken(rlt)
        if(rlt.code == '1000'){
          alert('修改成功')
        }else{
          alert('修改失败'+rlt.message)
        }
      })
    }
  }


  render(){
    const { visible, name, phone, address,district_id,districts } = this.state;
    const leftNav = {
      icon:'t-icon-angle-left',
      onClick:this.goBack
    }
    const rightNav = {
      title:'保存',
      onClick:this.handleSubmit
    }

    let daddress = '';
    _map(districts[1],(t)=>{
      daddress += t + ' ';
    })
    return(
      <div id="wrapper" className="edit-address-box bg-gray-lighter">
        <NavBar
          className="bg-gray-lighter"
          title={this._isNew?'新增地址':'编辑地址'}
          leftNav={leftNav}
          rightNav={rightNav}
          />
        <ul className="edit-list">
          <li>
            <i className="left t-icon-user-dark"></i>
            <span className="title">收货人</span>
            <input type="text" name='name' value={name} onChange={this.handleChange}/>
          </li>
          <li>
            <i className="left t-icon-phone-dark"></i>
            <span className="title">手机</span>
            <input type="tel" name='phone' value={phone} onChange={this.handleChange}/>
          </li>
          <li>
            <i className="left t-icon-address-circle"></i>
            <span className="title">地区</span>
            <input type="text"  onClick={this.showPicker} value={daddress} readOnly/>
            <span className={classnames(district_id?'hide':'right')}>请选择 <i className="t-icon-arrow-right"></i></span>
          </li>
          <li>
            <i className="left t-icon-address-dark"></i>
            <span className="title"  >地址</span>
            <input type="text" name='address' placeholder="请填写详细地址，不少于5个字" value={address} onChange={this.handleChange}/>
          </li>
        </ul>
        <CityPicker visible={visible} layer='3' setData={this._district} getData={ this.getData } confirm={ this.cancelPicker } cancel={ this.cancelPicker } />
      </div>
    )
  }
}

EditAddress.contextTypes = {
	router: React.PropTypes.object.isRequired
};
