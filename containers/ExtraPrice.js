import React, { Component } from 'react';
import iScroll from 'iscroll';
import ReactIScroll from 'react-iscroll';
import Switch from 'rc-switch';
import NavBar from '../components/NavBar/NavBar';
import Modal from '../components/Modal/Modal';
import { Link } from 'react-router';
import classnames from 'classnames';
import _map from 'lodash/map';


import Radio from 'rc-radio';
// const RadioItem = Radio.RadioItem;
// console.log(RadioItem)

import { getVouchersList, payOrders, checkDetection, getOrdersDetail, delOrders, get_userinfo, pay_wx, setOpenid} from '../apis/'
import { dateFormat } from '../util/'

const iScrollOptions = {
  mouseWheel: true,
  scrollbars: false,
  click:true
}

const app_id = "wx4a6ccdb9a09c5daa";

export default class ExtraPrice extends Component {
  constructor(props,context) {
    super(props)
    this.state = {
      visiable:false,
      is_show_vouchers:false,
      vouchers:null,
      voucherslist:[],
      order:null,
      isvouchers:false,
      showRadio:0,
      loading: true
    }
    this._user = this.props.user;
    this._checkToken = this.props.checkToken;
    this._isMounted = true;
    this._router = context.router;
    this._editId = props.params.id;
    this.goBack = this._router.goBack;
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openVouchersList = this.openVouchersList.bind(this);
    this.closeVouchersList = this.closeVouchersList.bind(this);
    this.renderVouchers = this.renderVouchers.bind(this);
    this.renderVouchersList = this.renderVouchersList.bind(this);
    this.selectVoucher = this.selectVoucher.bind(this);
    this.onSwitch = this.onSwitch.bind(this);
    this.payOrder = this.payOrder.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
      this.get_code = this.get_code.bind(this);
      this.getUrlParameter = this.getUrlParameter.bind(this);
  }

  componentWillMount(){
      console.log('componentWillMount extra this._user', this._user);
      const { saveUser } = this.props;
    this.props.checkLogin()
    const query = {
      token:this._user.token
    }
    getVouchersList(query,(rlt)=>{
      this._checkToken(rlt)
      if(rlt.code == '1000'){
        let rdata = [];
        _map(rlt.data,(t)=>{
          if(t.state == 1)rdata.push(t);
        })
        this.setState({
          voucherslist:rdata
        })
      }
    })
    query.id = this._editId;
    getOrdersDetail(query,(rlt)=>{
      this._checkToken(rlt)
      if(rlt.code == '1000'){
        this.setState({
          order:rlt.data
        })
      }
    });

      //check if have open id
      if(this._user.openid) {
          console.log('app check open id ', this._user.openid);
          console.log(this._user.openid);
          this.setState({
              loading: false
          })
      } else {
          this.setState({
              loading: true
          })
          let code = this.getUrlParameter('code');
          if(code) {
              this._user.is_code_request = false;
              saveUser(this._user);
              let that = this;
              get_userinfo(code, function(data) {
                  if(!data.openid) {
                      alert('node openid please contact your programmer');
                      return;
                  }
                  that._user.openid = data.openid;
                  saveUser(that._user);
                  console.log(that._user);
                  const query = {
                      token:that._user.token,
                      data: {openid: that._user.openid}
                  }
                  setOpenid(query,(rlt)=>{
                      that._checkToken(rlt)
                      console.log('setOpenid ', rlt);
                  });
              })
          } else {
              this._user.is_code_request = true;
              saveUser(this._user);
              var current_url = window.location.href;
              this.get_code(current_url);
          }

      }
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

  componentWillUnmount(){
    this._isMounted = false;
  }

  openModal(){
    this.setState({
      visiable:true
    })
  }

  closeModal(){
    this.setState({
      visiable:false
    })
  }

  openVouchersList(){
    this.setState({
      is_show_vouchers:true
    })
  }
  closeVouchersList(){
    this.setState({
      is_show_vouchers:false
    })
  }

  renderVouchersList(){
    return _map(this.state.voucherslist,(t,i)=>{
      // console.log(t)
      //1有效 0无效 2已投保 3已核销
      let ctag = '';
      switch (t.state) {
        case '0':
          ctag = '无效';
          break;
        case '1':
          ctag = '立即使用';
          break;
        case '2':
          ctag = '已投保';
          break;
        case '3':
          ctag = '已核销';
          break;
        default:
      }
      const expdate = parseInt((t.expired_time - (new Date).valueOf()/1000)/(60*60*24))
      return(
        <li className={classnames('coupons-item-box') } key={`coupons_${i}`} onClick={this.selectVoucher.bind(this,t)}>
          <div className={classnames('coupons-item', t.state == 1 ? 'active' : null, ) }>
            <div className="left">
              <em className="chinasarft_name">{t.chinasarft.name}</em>
              <span className="price">{`￥${t.last_amount}`}</span>
              <span className="cardno">{`卡号：${t.number}`}</span>
            </div>
            <div className="right">
              <p className="expirydate">有效期至：<span>{dateFormat(t.expired_time)}</span></p>
            </div>
            {(t.state == 1 && expdate < 7) ? <span className="expirydate-tag">{ expdate } 天后到期</span>:null}
            {<img className="state-tag hide" src={t.state == 0 ? '/imgs/coupons-state-1.png' : '/imgs/coupons-state-2.png'} alt=""/>}
          </div>
        </li>
      )
    })
  }

  renderVouchers(){
    const { isvouchers, vouchers } = this.state;
    //if(!isvouchers)return;
    //if(!vouchers)return (<div className="vouchers-select"><a onClick={()=>{this.openVouchersList()}}>请选择卡券</a></div>)
    // return (
    //   <div className="vouchers-select" onClick={()=>{this.openVouchersList()} }>
    //     <span className="left">卡号：{vouchers.number}</span>
    //     <span className="right">余额：{vouchers.last_amount}</span>
    //   </div>
    // )
  }

  selectVoucher(vouchers){
    this.setState({
      vouchers,
    },()=>{
      this.payOrder()
    })
    //this.closeVouchersList()
  }

  onSwitch(value){
    this.setState({
      isvouchers:value
    })
  }

    payOrder(){
        const { isvouchers, vouchers, showRadio } = this.state;
        const query = {
            token:this._user.token,
            data:{
                order_id:this._editId
            }
        }
        //pay ji fen
        if(showRadio == 0) {
          checkDetection(query,(rlt)=>{
            this._checkToken(rlt);
            if(rlt.code == '1000'){
              /*if(window.confirm('是否前往微信支付邮费10元?')){
                const options = {
                  openid:this._user.openid,
                  type:1,
                  order_id:this._editId,
                  pay:parseFloat(10).toFixed(2)
                };
                pay_wx(options);
              }*/
            }else if(rlt.code == '1002'){
              const amount = parseInt(rlt.data.amount);
              if(window.confirm(`积分不足，是否前往微信支付差额${amount}元?`)){
                const options = {
                  openid:this._user.openid,
                  type:1,
                  order_id:this._editId,
                  pay:parseFloat(amount).toFixed(2)
                };
                pay_wx(options);
              }
            }
          })
            /** payOrders(query,(rlt)=>{
                this._checkToken(rlt);
                if(rlt.code == '1000'){
                    alert('兑换成功')
                    this._router.replace('/account/orders');
                    return;
                } else if(rlt.code == '1002') {
                    let options = {};
                    options.openid = this._user.openid;
                    options.type = 1;
                    options.order_id = this._editId;
                    options.pay = rlt.data.amount;

                    if( window.confirm('积分不足，是否前往微信支付差额' + rlt.data.amount +'元?') ) {

                        pay_wx(options);
                    } else {
                        this._router.replace('/account/orders');
                        return;
                    }
                } else {
                    alert(rlt.message);
                }
            })*/
        }
        if(showRadio == 1) {
            if(!vouchers) return alert('选择卡券');
            query.data.voucher_id = vouchers.voucher_id;
            checkDetection(query,(rlt)=>{

              this._checkToken(rlt);
              if(rlt.code == '1000'){
                /*if(window.confirm('是否前往微信支付邮费10元?')){
                  const options = {
                    openid:this._user.openid,
                    type:2,
                    order_id:this._editId,
                    pay:parseFloat(10).toFixed(2),
                    voucher_id:vouchers.voucher_id
                  };
                  pay_wx(options);
                }*/

                payOrders(query,(rlt)=>{
                    this._checkToken(rlt);
                    if(rlt.code == '1000'){
                        alert('兑换成功')
                        this._router.replace('/account/orders');
                        return;
                    } else if(rlt.code == '1002') {
                        let options = {};
                        options.openid = this._user.openid;
                        options.type = 1;
                        options.order_id = this._editId;
                        options.pay = rlt.data.amount;
                        if( window.confirm('积分不足，是否前往微信支付差额' + rlt.data.amount +'元?') ) {
                            pay_wx(options);
                        } else {
                            this._router.replace('/account/orders');
                            return;
                        }
                    } else {
                        alert(rlt.message);
                    }
                })
              }else if(rlt.code == '1002'){
                const amount = parseFloat(rlt.data.amount);
                if(window.confirm(`卡券额度不足，是否前往微信支付差额${amount}元?`)){
                  const options = {
                    openid:this._user.openid,
                    type:2,
                    order_id:this._editId,
                    pay:parseFloat(amount).toFixed(2),
                    voucher_id:vouchers.voucher_id
                  };
                  pay_wx(options);
                }
              }
            })
            /** payOrders(query,(rlt)=>{
                this._checkToken(rlt);
                if(rlt.code == '1000'){
                    alert('兑换成功')
                    this._router.replace('/account/orders');
                    return;
                } else if(rlt.code == '1002') {
                    let options = {};
                    options.openid = this._user.openid;
                    options.type = 2;
                    options.order_id = this._editId;
                    options.pay = rlt.data.amount;
                    options.voucher_id = vouchers.voucher_id;


                    if( window.confirm('卡券额度不足，是否前往微信支付差额' + rlt.data.amount +'元?') ) {

                        pay_wx(options);
                    } else {
                        this._router.replace('/account/orders');
                        return;
                    }
                } else {
                    alert(rlt.message);
                }

             })*/
        }
        if(showRadio == 2) {
            let options = {
              openid:this._user.openid,
              type:3,
              order_id:this._editId,
              pay:parseFloat(this.state.order.amount).toFixed(2)
            };
            pay_wx(options);
        }


    // const query = {
    //   token:this._user.token,
    //   data:{
    //     order_id:this._editId
    //   }
    // }
    // if(isvouchers){
    //   if(!vouchers) return alert('选择卡券');
    //   query.data.voucher_id = vouchers.voucher_id;
    // }
    // payOrders(query,(rlt)=>{
    //   this._checkToken(rlt);
    //   if(rlt.code == '1000'){
    //     alert('兑换成功')
    //     this._router.replace('/account/orders');
    //   }else{
    //     alert(rlt.message)
    //   }
    // })
  }

  cancelOrder(){
    const query = {
      token:this._user.token,
      id:this._editId
    }
    delOrders(query,(rlt)=>{
      this._checkToken(rlt);
      if(rlt.code == '1000'){
        alert('删除成功')
        this._router.replace('/account/orders');
      }else{
        alert(rlt.message)
      }
    })

  }

  onClickRadio(state) {
    this.setState({
      showRadio: state,
    })
  }

  render(){
    const { visiable, is_show_vouchers, voucherslist, isvouchers, order  } = this.state;
    const leftNav = {
      icon:'t-icon-angle-left',
      onClick:this.goBack
    }
    const vouchersleftNav={
      icon:'t-icon-angle-left',
      onClick:this.closeVouchersList
    }
    const rightNav = {
      title:'取消订单',
      onClick:this.cancelOrder
    }
    return(
      <div className="wrapper extra-price-box bg-gray-lighter">
        <NavBar
          className="bg-gray-lighter"
          title="支付"
          leftNav={leftNav}
          rightNav={rightNav}
          />

            {
              // <div className="switch-voucher-box">{isvouchers?'卡券兑换':'积分兑换'}<Switch className="switch-voucher" onChange={this.onSwitch} checkedChildren={'卡'} unCheckedChildren={'积'} defaultChecked={isvouchers}/></div>
              // {this.renderVouchers()}
            }
        <div className="switch-voucher-box"  onClick={ this.onClickRadio.bind(this,0) }>积分兑换{ this.state.showRadio==0?<i style={{ float:"right", }} >选中</i>:null }</div>
        <div className="switch-voucher-box"  style={{ borderTop:'0 solid red' }} onClick={ this.onClickRadio.bind(this,1) } >卡卷支付{ this.state.showRadio==1?<i style={{ float:"right", }} >选中</i>:null }</div>
        <div className="switch-voucher-box"  style={{ borderTop:'0 solid red' }} onClick={ this.onClickRadio.bind(this,2) } >微信支付{ this.state.showRadio==2?<i style={{ float:"right", }} >选中</i>:null }</div>
{
  //<div className="switch-voucher-box"  onClick={ this.onClickRadio.bind(this,2) } >现金支付{ this.state.showRadio==2?<i style={{ float:"right", }} >选中</i>:null }</div>
}

        <button className="pay-btn" loading={this.state.loading} onClick={ this.state.showRadio==1?this.openVouchersList:this.payOrder } >确认支付 <span>{order && order.amount}</span></button>
        <Modal
          isOpen={visiable}
          handleChancel={this.closeModal}
          >
          <div className="modal-default">
            <div className="modal-header">提示</div>
            <div className="convert-success-modal">
              <p>兑换成功，我们将以短信形式发送您的运单号码，请您注意查收！</p>
              <button onClick={this.closeModal}>我知道了</button>
            </div>
          </div>
        </Modal>
        <div className={classnames('vouchers-select-box',is_show_vouchers?'active':'')}>
          <NavBar
            className="bg-gray-lighter"
            title="选择卡券"
            leftNav={vouchersleftNav}
            rightNav={rightNav}
            />
          <ul className="coupons-list">{this.renderVouchersList()}</ul>
        </div>
      </div>
    )
  }
}

ExtraPrice.contextTypes = {
	router: React.PropTypes.object.isRequired
};
