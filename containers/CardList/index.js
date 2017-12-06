import React, { Component } from 'react';
import iScroll from 'iscroll';
import ReactIScroll from 'react-iscroll';
import Menu from '../../components/Menu';
import classnames from 'classnames';
import { Link } from 'react-router';
import _map from 'lodash/map';
import NavBar from '../../components/NavBar/NavBar';
import './style.scss'

const iScrollOptions = {
  mouseWheel: true,
  scrollbars: false,
  click:true
}

import { getGoodsList, Image_URL } from '../../apis/'

import { dateFormat } from '../../util/'

const imageview = '';//'?imageView2/0/w/200/h/200';

let keyword = '',timeout = null,cate_id = null;
export default class CardList extends Component {
  constructor(props,context) {
    super(props)
    this.state = {
      voucherslist:[
        {
                "voucher_id": "21094",
                "voucher_cate_id": "22",
                "state": "1",
                "number": "1020170113024019",
                "password": "801329",
                "chinasarft_id": "111",
                "agency_id": null,
                "uid": "21159",
                "given_uid": "21159",
                "given_at": "2017-01-13 02:44:55",
                "total_amount": "108.00",
                "last_amount": "108.00",
                "insure_amount": "1500.00",
                "goods_amount": "10.00",
                "expired_time": "1515811219",
                "create_at": "2017-01-13 10:40:19",
                "update_at": "2017-01-13 10:45:04",
                "chinasarft": {
                    "name": "测试1",
                    "address": "sdd",
                    "chinasarft_id": "111"
                },
                "agency": null,
                "voucherCate": {
                    "voucher_cate_id": "22",
                    "total_amount": "108.00",
                    "insure_amount": "1500.00",
                    "goods_amount": "10.00",
                    "type": "1",
                    "expired_in": "31536000",
                    "create_at": "2016-11-24 12:17:22"
                }
            },
            {
                "voucher_id": "21093",
                "voucher_cate_id": "23",
                "state": "1",
                "number": "1020170113024002",
                "password": "918306",
                "chinasarft_id": "111",
                "agency_id": null,
                "uid": "21159",
                "given_uid": null,
                "given_at": null,
                "total_amount": "128.00",
                "last_amount": "128.00",
                "insure_amount": "1500.00",
                "goods_amount": "10.00",
                "expired_time": "1515811202",
                "create_at": "2017-...6",
                "create_at": "2017-01-13 10:39:46",
                "update_at": "2017-01-13 10:39:46",
                "chinasarft": {
                    "name": "测试1",
                    "address": "sdd",
                    "chinasarft_id": "111"
                },
                "agency": null,
                "voucherCate": {
                    "voucher_cate_id": "23",
                    "total_amount": "128.00",
                    "insure_amount": "1500.00",
                    "goods_amount": "10.00",
                    "type": "1",
                    "expired_in": "31536000",
                    "create_at": "2016-11-24 12:17:34"
                }
            },
            {
                "voucher_id": "21088",
                "voucher_cate_id": "23",
                "state": "1",
                "number": "1020170105084022",
                "password": "998566",
                "chinasarft_id": "111",
                "agency_id": null,
                "uid": "21159",
                "given_uid": "21159",
                "given_at": "2017-01-13 02:34:54",
                "total_amount": "128.00",
                "last_amount": "128.00",
                "insure_amount": "1500.00",
                "goods_amount": "10.00",
                "expired_time": "1515141622",
                "create_at": "2017-01-05 16:40:22",
                "update_at": "2017-01-13 10:35:03",
                "chinasarft": {
                    "name": "测试1",
                    "address": "sdd",
                    "chinasarft_id": "111"
                },
                "agency": null,
                "voucherCate": {
                    "voucher_cate_id": "23",
                    "total_amount": "128.00",
                    "insure_amount": "1500.00",
                    "goods_amount": "10.00",
                    "type": "1",
                    "expired_in": "31536000",
                    "create_at": "2016-11-24 12:17:34"
                }
            },
            {
                "voucher_id": "21088",
                "voucher_cate_id": "23",
                "state": "1",
                "number": "1020170105084022",
                "password": "998566",
                "chinasarft_id": "111",
                "agency_id": null,
                "uid": "21159",
                "given_uid": "21159",
                "given_at": "2017-01-13 02:34:54",
                "total_amount": "128.00",
                "last_amount": "128.00",
                "insure_amount": "1500.00",
                "goods_amount": "10.00",
                "expired_time": "1515141622",
                "create_at": "2017-01-05 16:40:22",
                "update_at": "2017-01-13 10:35:03",
                "chinasarft": {
                    "name": "测试1",
                    "address": "sdd",
                    "chinasarft_id": "111"
                },
                "agency": null,
                "voucherCate": {
                    "voucher_cate_id": "23",
                    "total_amount": "128.00",
                    "insure_amount": "1500.00",
                    "goods_amount": "10.00",
                    "type": "1",
                    "expired_in": "31536000",
                    "create_at": "2016-11-24 12:17:34"
                }
            },
            {
                "voucher_id": "21088",
                "voucher_cate_id": "23",
                "state": "1",
                "number": "1020170105084022",
                "password": "998566",
                "chinasarft_id": "111",
                "agency_id": null,
                "uid": "21159",
                "given_uid": "21159",
                "given_at": "2017-01-13 02:34:54",
                "total_amount": "128.00",
                "last_amount": "128.00",
                "insure_amount": "1500.00",
                "goods_amount": "10.00",
                "expired_time": "1515141622",
                "create_at": "2017-01-05 16:40:22",
                "update_at": "2017-01-13 10:35:03",
                "chinasarft": {
                    "name": "测试1",
                    "address": "sdd",
                    "chinasarft_id": "111"
                },
                "agency": null,
                "voucherCate": {
                    "voucher_cate_id": "23",
                    "total_amount": "128.00",
                    "insure_amount": "1500.00",
                    "goods_amount": "10.00",
                    "type": "1",
                    "expired_in": "31536000",
                    "create_at": "2016-11-24 12:17:34"
                }
            },
            {
                "voucher_id": "21088",
                "voucher_cate_id": "23",
                "state": "1",
                "number": "1020170105084022",
                "password": "998566",
                "chinasarft_id": "111",
                "agency_id": null,
                "uid": "21159",
                "given_uid": "21159",
                "given_at": "2017-01-13 02:34:54",
                "total_amount": "128.00",
                "last_amount": "128.00",
                "insure_amount": "1500.00",
                "goods_amount": "10.00",
                "expired_time": "1515141622",
                "create_at": "2017-01-05 16:40:22",
                "update_at": "2017-01-13 10:35:03",
                "chinasarft": {
                    "name": "测试1",
                    "address": "sdd",
                    "chinasarft_id": "111"
                },
                "agency": null,
                "voucherCate": {
                    "voucher_cate_id": "23",
                    "total_amount": "128.00",
                    "insure_amount": "1500.00",
                    "goods_amount": "10.00",
                    "type": "1",
                    "expired_in": "31536000",
                    "create_at": "2016-11-24 12:17:34"
                }
            },
            {
                "voucher_id": "21088",
                "voucher_cate_id": "23",
                "state": "1",
                "number": "1020170105084022",
                "password": "998566",
                "chinasarft_id": "111",
                "agency_id": null,
                "uid": "21159",
                "given_uid": "21159",
                "given_at": "2017-01-13 02:34:54",
                "total_amount": "128.00",
                "last_amount": "128.00",
                "insure_amount": "1500.00",
                "goods_amount": "10.00",
                "expired_time": "1515141622",
                "create_at": "2017-01-05 16:40:22",
                "update_at": "2017-01-13 10:35:03",
                "chinasarft": {
                    "name": "测试1",
                    "address": "sdd",
                    "chinasarft_id": "111"
                },
                "agency": null,
                "voucherCate": {
                    "voucher_cate_id": "23",
                    "total_amount": "128.00",
                    "insure_amount": "1500.00",
                    "goods_amount": "10.00",
                    "type": "1",
                    "expired_in": "31536000",
                    "create_at": "2016-11-24 12:17:34"
                }
            },
            {
                "voucher_id": "21088",
                "voucher_cate_id": "23",
                "state": "1",
                "number": "1020170105084022",
                "password": "998566",
                "chinasarft_id": "111",
                "agency_id": null,
                "uid": "21159",
                "given_uid": "21159",
                "given_at": "2017-01-13 02:34:54",
                "total_amount": "128.00",
                "last_amount": "128.00",
                "insure_amount": "1500.00",
                "goods_amount": "10.00",
                "expired_time": "1515141622",
                "create_at": "2017-01-05 16:40:22",
                "update_at": "2017-01-13 10:35:03",
                "chinasarft": {
                    "name": "测试1",
                    "address": "sdd",
                    "chinasarft_id": "111"
                },
                "agency": null,
                "voucherCate": {
                    "voucher_cate_id": "23",
                    "total_amount": "128.00",
                    "insure_amount": "1500.00",
                    "goods_amount": "10.00",
                    "type": "1",
                    "expired_in": "31536000",
                    "create_at": "2016-11-24 12:17:34"
                }
            },
            {
                "voucher_id": "21088",
                "voucher_cate_id": "23",
                "state": "1",
                "number": "1020170105084022",
                "password": "998566",
                "chinasarft_id": "111",
                "agency_id": null,
                "uid": "21159",
                "given_uid": "21159",
                "given_at": "2017-01-13 02:34:54",
                "total_amount": "128.00",
                "last_amount": "128.00",
                "insure_amount": "1500.00",
                "goods_amount": "10.00",
                "expired_time": "1515141622",
                "create_at": "2017-01-05 16:40:22",
                "update_at": "2017-01-13 10:35:03",
                "chinasarft": {
                    "name": "测试1",
                    "address": "sdd",
                    "chinasarft_id": "111"
                },
                "agency": null,
                "voucherCate": {
                    "voucher_cate_id": "23",
                    "total_amount": "128.00",
                    "insure_amount": "1500.00",
                    "goods_amount": "10.00",
                    "type": "1",
                    "expired_in": "31536000",
                    "create_at": "2016-11-24 12:17:34"
                }
            },
            {
                "voucher_id": "21088",
                "voucher_cate_id": "23",
                "state": "1",
                "number": "1020170105084022",
                "password": "998566",
                "chinasarft_id": "111",
                "agency_id": null,
                "uid": "21159",
                "given_uid": "21159",
                "given_at": "2017-01-13 02:34:54",
                "total_amount": "128.00",
                "last_amount": "128.00",
                "insure_amount": "1500.00",
                "goods_amount": "10.00",
                "expired_time": "1515141622",
                "create_at": "2017-01-05 16:40:22",
                "update_at": "2017-01-13 10:35:03",
                "chinasarft": {
                    "name": "测试1",
                    "address": "sdd",
                    "chinasarft_id": "111"
                },
                "agency": null,
                "voucherCate": {
                    "voucher_cate_id": "23",
                    "total_amount": "128.00",
                    "insure_amount": "1500.00",
                    "goods_amount": "10.00",
                    "type": "1",
                    "expired_in": "31536000",
                    "create_at": "2016-11-24 12:17:34"
                }
            }
      ],
      sort:0,
      cate_name:''
    }
    cate_id = this.props.params.id;
    this._router = context.router;
    this.goBack = this._router.goBack;
    this.renderVouchersList = this.renderVouchersList.bind(this);
  }

  componentDidMount(){
    //this.getGoods();

  }

/*  getGoods(){
    const { sort } = this.state;
    const query = {
      query:{
        cate_id,
        keyword,
        sort
      }
    }
    getGoodsList(query,(rlt)=>{
      if(rlt.code == '1000'){
        this.setState({
          cate_name:rlt.data.name,
          data:rlt.data.goods
        })
      }
    })
  }*/

  componentWillUnmount(){
    timeout && clearTimeout(timeout)
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
            <li className={classnames('coupons-item-box') } key={`coupons_${i}`} >
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

  renderBX(){
    return _map(this.state.data,(t,i)=>(
      <Link to={{pathname:`/goods/detail/${t.goods_id}`,state:t}} className="item" key={`goods_${t.goods_id}`}>
        <img className="item-image" src={`${Image_URL}${t.pic}${imageview}`} alt=""/>
      </Link>
    ))
  }

  handleChange(e){
    keyword = e.target.value;
    timeout && clearTimeout(timeout)
    timeout = setTimeout(()=>{
      this.getGoods()
    },300)
  }

  handleSortChange(value){
    this.setState({
      sort:value
    },()=>{
      this.getGoods()
    })

  }

  render(){
    const { cate_name, sort  } = this.state;
    const leftNav = {
      icon:'t-icon-angle-left',
      onClick:this.goBack
    }
    const rightNav = {
      icon:'t-icon-angle-left',
      style:{opacity:0}
    }

    if(cate_id == 15) {
      return (
        <div id="wrapper" className="baoxian-box">
          <ReactIScroll
            ref={(r)=>{
              this._iScroll = r;
            }}
            iScroll={iScroll}
            options={iScrollOptions}
            >
            <div className="baoxian-list">
              {this.renderBX()}
            </div>
          </ReactIScroll>
          <Menu />
        </div>
      )
    }

    return(
      <div id="wrapper" className="goods-box">
        <NavBar
          leftNav={leftNav}
          rightNav={rightNav}
          className="fixed-header-top"
          />
        <ReactIScroll
          ref={(r)=>{
            this._iScroll = r;
          }}
          iScroll={iScroll}
          options={iScrollOptions}
          >
          <ul className="coupons-list margin-top-nar">{this.renderVouchersList()}</ul>
        </ReactIScroll>
        <Menu />
      </div>
    )
  }
}

CardList.contextTypes = {
	router: React.PropTypes.object.isRequired
};
