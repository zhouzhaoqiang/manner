import React, { Component } from 'react';
import NavBar from '../components/NavBar/NavBar';
import iScroll from 'iscroll';
import ReactIScroll from 'react-iscroll';
import classnames from 'classnames';
import { Link } from 'react-router';
import _map from 'lodash/map';
import $ from "jquery";

import { getOrdersDetail,getOrdersDetailWl, Image_URL } from '../apis/';

const iScrollOptions = {
  mouseWheel: true,
  scrollbars: false,
  click:true,
}

const imageview = '?imageView2/0/w/100/h/100';

export default class CancelOrder extends Component {
  constructor(props,context) {
    super(props)
    this.state = {
      num:0,
      data:[],
      dataWl : {
        com: "暂未发货",
        nu: "暂未发货",
        data:[],
      },
      phone: "暂时没有派送员电话信息",

    }
    this._index= false;
    this._router = context.router;
    this.cancelOrder = this.cancelOrder.bind(this)
    this.textChange = this.textChange.bind(this)
    this._data = {
      name:"暂未发货",
      address:"暂未发货",
      phone:"暂未发货",
    };
    this._editId = props.params.id;
    this._user = this.props.user;
    this._checkToken = this.props.checkToken;
    this._isMounted = true;
    this.goBack = this._router.goBack;
    this.getOrders = this.getOrders.bind(this);

  }


  componentWillMount(){
    this._isMounted = this.props.checkLogin()
    this.getOrders()
  }

  componentDidMount() {
    // let obj = $(".logistics_details_con_height");
    // obj.each((i)=>{
    //   let style= obj.eq(i).css("height");
    //   $(".logistics_details_con_left_height").eq(i).css("height", style);
    // })
  }

  getOrders(){
    const query = {
      token:this._user.token,
      id : this._editId,
    }
    getOrdersDetail(query,(rlt)=>{
      this._checkToken(rlt)
      if(rlt.code == '1000'){
        this._data = rlt.data;
        let arr=[];
        arr[0]= this._data;
        this.setState({
          data:arr,
        })
      }
    })


    const queryWl = {
      token:this._user.token,
      query : {
        order_id: this._editId,
      }
    }
    getOrdersDetailWl(queryWl,(rlt)=>{
      this._checkToken(rlt)
      if(rlt.code == '1000'){
        this.setState({
          dataWl:rlt.data,
        })
      }
    })
  }


  goBack(){
    const { router } = this.context;
    router.goBack();
  }

  cancelOrder(){
    //do something
    this.goBack()
  }

  textChange(){
    let value = this._textarea.value;
    if(value.length>200){
      this._textarea.value = value.substr(0,200);
    }
    const num = this._textarea.value.length;
    this.setState({
      num,
    })
  }

  renderOrders(){
    let goods;
    let This=this;
    return _map(this.state.data,(t,i)=>{
      if(i>0)return;
      goods = t.details[0];
      return(
        <li className="order-item" key={`oi${i}`} onClick={ ( e )=>{
            e.stopPropagation();
            This._router.push(`/goods/detail/${goods.goods_id}`);
          } } >
          <img className="item-image" src={`${Image_URL}${goods.goods.pic}${imageview}`} alt=""/>
          <div className="center">
            <p className="name">{goods.goods.name}</p>
            <span className="time">{goods.create_at}</span>
          </div>
          <div className="right">
            <span className="price">{`￥${goods.amount}`}</span>
            <span className="freight">运费：免运费</span>
            <span className="num">x1</span>
          </div>
        </li>
      )
    })
  }




  render(){
    console.log(this.state.data)
    const leftNav = {
      icon:'t-icon-angle-left',
      onClick:this.goBack
    }
    const rightNav = {
      title:'刷新',
      onClick:()=>{
        this.getOrders()
      }
    }


    return(
      <div className="wrapper order-list-box bg-gray-lighter">
        <NavBar
          className="bg-gray-lighter"
          title="订单详情"
          leftNav={leftNav}
          rightNav={rightNav}
          style={{borderBottom:'1px solid #ccc'}}
          />

        <ReactIScroll
          ref={(r)=>{
            this._iScroll = r;
          }}
          iScroll={iScroll}
          options={iScrollOptions}
          >
          <div className="ReactIScroll_clearBottom">
            <div className="divFh">
              <p className="divFh_text">商品已发货请注意查收</p>
              <div className="divFh_box">
                <div className="divFh_left">
                  <i className="iconfont">&#xe602;</i>
                </div>
                <div className="divFh_right">
                  <div className="divFh_right_top">
                    <p className="sp1">收货人:<span>{ this._data.name }</span></p>
                    <p className="sp2">手机:<span>{ this._data.phone }</span></p>
                  </div>
                  <p className="divFh_right_bottom">收货地址:<span>{ this._data.address }</span></p>
                </div>
              </div>
            </div >
            <ul className="order-list divFh_shrText_order-list">
              {this.renderOrders()}
            </ul>
            <div className="logistics_details">
              <p className="logistics_company">物流公司:<span>{ this.state.dataWl.com }</span></p>
              <p className="logistics_company">物流单号:<span>{ this.state.dataWl.nu }</span></p>
              <a style={{ display: "block", }} href={
                  (()=>{
                    _map(this.state.dataWl.data,( item, i )=>{
                        if(/1[34578]\d{9}$/.test(item.context)){
                          let reg = new RegExp(/1[34578]\d{9}$/);
                          let r = item.context.match(reg);
                          this._index = "tel:"+r[0];
                        }
                    })
                    return this._index?this._index:"javascript:void(0)";
                  })()

            } className="logistics_company">快递员电话:<span>{

                _map(this.state.dataWl.data,( item, i )=>{
                    if(/1[34578]\d{9}$/.test(item.context)){
                      let reg = new RegExp(/1[34578]\d{9}$/);
                      let r = item.context.match(reg);
                      this._index = r[0];
                    }
                    if(this.state.dataWl.data.length-1==i){
                      return this._index
                    }
                })
              }</span><p className="iconfont" style={{ float:"right",paddingRight:"10px",fontSize:"24px", }} >&#xe603;</p></a>
              <p className="logistics_company">物流信息:</p>
              <div className="logistics_details_con">
                {

                  _map(this.state.dataWl.data,( item, i )=>{
                    return (
                      <div className="logistics_details_con_0 logistics_details_con_height" key={ "logistics_details_con_heigh"+i }>
                        <div className="logistics_details_con_0_left logistics_details_con_left_height">
                          <i className="iconfont">&#xe602;</i>
                        </div>
                        <div className="logistics_details_con_0_right" >
                          <p className="logistics_details_con_0_right_test" >{ item.time }</p>
                          <p className="logistics_details_con_0_right_test" >{ item.context }</p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </ReactIScroll>

      </div>
    )
  }
}

CancelOrder.contextTypes = {
	router: React.PropTypes.object.isRequired
};
