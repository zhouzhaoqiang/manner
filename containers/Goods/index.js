import React, { Component } from 'react';
import iScroll from 'iscroll';
import ReactIScroll from 'react-iscroll';
import Menu from '../../components/Menu';
import classnames from 'classnames';
import { Link } from 'react-router';
import _map from 'lodash/map';
import './style.scss'

const iScrollOptions = {
  mouseWheel: true,
  scrollbars: false,
  click:true
}

import { getGoodsList, Image_URL } from '../../apis/'

const imageview = '';//'?imageView2/0/w/200/h/200';

let keyword = '',timeout = null,cate_id = null;
export default class Goods extends Component {
  constructor(props,context) {
    super(props)
    this.state = {
      data:[],
      sort:0,
      cate_name:''
    }
    cate_id = this.props.params.id;
    this._router = context.router;
    this.goBack = this._router.goBack;
  }

  componentDidMount(){
    this.getGoods();
  }

  getGoods(){
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
  }

  componentWillUnmount(){
    timeout && clearTimeout(timeout)
  }


  renderGoods(){
    return _map(this.state.data,(t,i)=>(
        <Link to={{pathname:`/goods/detail/${t.goods_id}`,state:t}} className="goods-item" key={`goods_${t.goods_id}`}>
          <img className="item-image" src={`${Image_URL}${t.pic}${imageview}`} alt=""/>
          <div className="item-info">
            <p className="title">{t.name}</p>
            <span className="price">{`${t.amount}`}</span>
            <span className="m-price">{`积分：${t.price}`}</span>
            <button className="btn-buy">兑换</button>
          </div>
        </Link>
      )
    )
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
        <div className="goods-header">
          <div className="search">
            <input ref="keyword" type="text" placeholder="搜索商品" onChange={(e)=>{this.handleChange(e)}}/>
            <i className="t-icon-search"></i>
          </div>
          <div className="sort">
            <div className={classnames('sort-item',sort==0?'active':'')} onClick={()=>{this.handleSortChange(0)}}>综合排序</div>
            <div className={classnames('sort-item','sortupdown',sort==1?'activedown':sort==2?'activeup':'')} onClick={()=>{
              let _sort = (sort == 1)?2:1;
              this.handleSortChange(_sort)}
            }>价格</div>
            <div className={classnames('sort-item','sortupdown',sort==3?'activedown':sort==4?'activeup':'')} onClick={()=>{
              let _sort = (sort == 3)?4:3;
              this.handleSortChange(_sort)
            }}>销量</div>
          </div>
        </div>
        <div className="goods-filter hide">
          <span>价格筛选</span>
          <i className="t-icon-arrow-down"></i>
        </div>
        <ReactIScroll
          ref={(r)=>{
            this._iScroll = r;
          }}
          iScroll={iScroll}
          options={iScrollOptions}
          >
          <div className="goods-list">
            {this.renderGoods()}
          </div>
        </ReactIScroll>
        <Menu />
      </div>
    )
  }
}

Goods.contextTypes = {
	router: React.PropTypes.object.isRequired
};
