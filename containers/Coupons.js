import React, { Component } from 'react';
import NavBar from '../components/NavBar/NavBar';
import Modal from '../components/Modal/Modal';
import iScroll from 'iscroll';
import ReactIScroll from 'react-iscroll';
import classnames from 'classnames';
import { Link } from 'react-router';
import QRCode from 'qrcode.react';
import _map from 'lodash/map';
import _assign from 'lodash/assign';

import { getVouchersList, giveVouchers } from '../apis/'
import { dateFormat, dateFormat2 } from '../util/'

const iScrollOptions = {
  mouseWheel: true,
  scrollbars: false,
  click: true
}

export default class Coupons extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      isedit: false,
      isModalOpen: false,
      isReModalOpen: false,
      isinvalid:true,
      data: [],
      editItem:{}
    }
    this._data = null;
    this._user = this.props.user;
    this._checkToken = this.props.checkToken;
    this._router = context.router;
    this._isMounted = true;
    this.goBack = this._router.goBack;
    this.openReGidted = this.openReGidted.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.openUseModal = this.openUseModal.bind(this);
    this.getVouchers = this.getVouchers.bind(this);
    this.showinvalid = this.showinvalid.bind(this);
    this.useCoupons = this.useCoupons.bind(this);
    this.cancelModal = this.cancelModal.bind(this);
    this.openReModal = this.openReModal.bind(this);
    this.cancelReModal = this.cancelReModal.bind(this);
    this.reGift = this.reGift.bind(this);
  }

  componentWillMount(){
    this._isMounted = this.props.checkLogin()
    this.getVouchers()
  }

  getVouchers(){
    const query = {
      token:this._user.token
    }
    getVouchersList(query,(rlt)=>{
      this._checkToken(rlt)
      if(rlt.code == '1000'){
        this._data = rlt.data;
        let data = [];
        _map(this._data,(t)=>{
          t._check = false;
          if(t.state != '0') data.push(t);
        })
        this.setState({
          data,
        })
      }
    })
  }

  openReGidted() {//转赠
    this.setState({
      isedit: !this.state.isedit
    })
  }

  reGift(){

    const { editItem } = this.state;
    const phone = this.refs['re_phone'].value;
    const query = {
      token:this._user.token,
      data:{
        phone,
        voucher_id:editItem.voucher_id
      }
    }
    giveVouchers(query,(rlt)=>{
      this._checkToken(rlt)
      if(rlt.code == '1000'){
        this.cancelReModal()
        this.getVouchers()
        alert("亲,转赠成功！");
      }else if(rlt.code == '1011'){
          alert(rlt.message);
      }else{
        alert("转赠失败，请确认手机号为"+phone+"的用户是否存在！");
      }

    })
  }

  handleClick(item) {
    const data = _assign({},this._data)
    _map(data, (t) => { t.check = t.voucher_id == item.voucher_id; })
    this.setState({
      data,
      editItem:item
    })
    this.openReModal()
  }

  openUseModal() {
    this.setState({
      isModalOpen: true
    })
  }

  openReModal(){
    this.setState({
      isReModalOpen: true
    })
  }

  cancelModal(){
    this.setState({
      isModalOpen: false
    })
  }

  cancelReModal(){
    this.setState({
      isReModalOpen: false
    })
  }

  showinvalid(){
    let data = [];
    const { isinvalid } = this.state;
    if(isinvalid){
      _map(this._data, (t) => { if(t.state == '1')data.push(t) })
    }else{
      _map(this._data, (t) => { if(t.state != '1')data.push(t) })
    }
    this.setState({
      isinvalid:!isinvalid,
      data,
    })
  }

  useCoupons(item){
    if(item.state != '1') return;
    // this.setState({
    //   editItem:item
    // })
    // this.openUseModal()
    this._router.replace('/home');
  }


  renderCoupons() {
    let data = [];
    const { isinvalid } = this.state;
    if(isinvalid){
      _map(this._data, (t) => { if(t.state == '1')data.push(t) })
    }else{
      _map(this._data, (t) => { if(t.state != '1')data.unshift(t) })
    }
    return _map(data, (t, i) => {
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
      return (
        <li className={classnames('coupons-item-box', this.state.isedit ? 'isedit' : null) } key={`coupons_${i}`}>
          <div className={classnames('item-check', t.check ? 'active' : null) }>
            <span className="ckeckbox" onClick={this.handleClick.bind(this, t) }></span>
          </div>
          <div className={classnames('coupons-item', t.state == 1 ? 'active' : null, ) }>
            <div className="left">
              <em className="chinasarft_name">{t.chinasarft.name}</em>
              <span className="price">{`￥${t.last_amount}`}</span>
              <span className="cardno">{`卡号：${t.number}`}</span>
              <span className="cardno">{`密码：${t.password}`}</span>
            </div>
            <div className="right">
              <p className="expirydate"><span>有效期至：</span><span>{dateFormat2(t.expired_time)}</span></p>
              <span onClick={this.useCoupons.bind(this,t)} className={classnames('usenow-btn', t.state == 1 ? 'active' : '') }>{ctag}</span>
            </div>
            {(t.state == 1 && expdate < 7) ? <span className="expirydate-tag">{ expdate } 天后到期</span>:null}
            {<img className="state-tag hide" src={t.state == 0 ? '/imgs/coupons-state-1.png' : '/imgs/coupons-state-2.png'} alt=""/>}
          </div>
        </li>
      )
    })
  }

  render() {
    const { isModalOpen, isinvalid, editItem, isReModalOpen } = this.state;
    const leftNav = {
      icon: 't-icon-angle-left',
      onClick: this.goBack
    }
    const rightNav = this._isinvalid ? {
      icon: 't-icon-angle-left',
      style: { opacity: 0 }
    } : {
        title: this.state.isedit ? '完成' : '转赠',
        onClick: this.openReGidted
      }
    if(!this._isMounted) return null;
    return (
      <div id="wrapper" className="coupons-list-box bg-gray-lighter">
        <NavBar
          className="bg-gray-lighter"
          title={isinvalid ? '我的卡券（按有效期排序）' : '失效券（按失效时间排序）'}
          leftNav={leftNav}
          rightNav={rightNav}
          style={{ borderBottom: '1px solid #ccc' }}
          />
        <ReactIScroll
          ref={(r) => {
            this._iScroll = r;
          }}
          iScroll={iScroll}
          options={iScrollOptions}
          >
          <ul className="coupons-list">
            {this.renderCoupons() }
          </ul>
        </ReactIScroll>
        <span className="invalid-coupons" onClick={this.showinvalid}>{isinvalid?'查看失效券':'查看有效券'}</span>
        <Modal
          isOpen={isModalOpen}
          handleChancel={this.cancelModal}
          >
          <div className="modal-default">
            <div className="modal-header">卡号:{ editItem.number }</div>
            <div className="use-modal">
              <div className="qr-box">
                <QRCode value={("Accoun: "+editItem.number+" --------- password: "+editItem.password) } />
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={isReModalOpen}
          handleChancel={this.cancelReModal}
          >
          <div className="modal-default">
            <div className="modal-header">卡号:{ editItem.number }</div>
            <div className="use-modal">
              <div className="re_gifte">
                手机号：<input type="tel" ref='re_phone' placeholder="请输入转赠手机号"/>
              <button className="re_gifte_btn" onClick={this.reGift}>确认转赠</button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

Coupons.contextTypes = {
  router: React.PropTypes.object.isRequired
};
