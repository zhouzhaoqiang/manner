import React, { Component } from 'react';
import iScroll from 'iscroll';
import ReactIScroll from 'react-iscroll';
import NavBar from '../components/NavBar/NavBar';
import Menu from '../components/Menu'
import classnames from 'classnames';
import { Link } from 'react-router';
import _map from 'lodash/map';

import { getVipGoodsList, Image_URL } from '../apis/'

const imageview = '';//?imageView2/0/w/400/h/400';

const iScrollOptions = {
  mouseWheel: true,
  scrollbars: false,
  click:true
}

export default class Vip extends Component {
  constructor(props,context) {
		super(props)
    this.state = {
      data:[]
    }
    this._router = context.router;
    this._user = this.props.user;
    this.goBack = this._router.goBack;
    if(this._user.role_level==0)
      this._router.replace('/');
	}

  componentDidMount(){
    this.props.checkLogin();

    getVipGoodsList((rlt)=>{
      if(rlt.code == 1000){
        this.setState({
          data:rlt.data
        })
      }
    })


    /*getCatesList((rlt)=>{
      if(rlt.code == '1000'){
        this.setState({
          data:rlt.data
        })
      }
    })*/
  }


  renderGoods(){
    return _map(this.state.data,t =>(
        <li className="goods-item" key={`goods_${t.goods_id}`}>
          <img  className="image" src={`${Image_URL}${t.pic}`} alt=""/>
          <div className="desc">
          <span className="name">{t.name}</span>
          <div>
            <span className="price">{t.price}</span>
            <Link to={{pathname:`/goods/detail/${t.goods_id}`,state:t}} className="pay-btn" key={`goods_${t.goods_id}`}>兑换</Link>
          </div>
          <span className="amount">积分:{t.amount}</span>
          </div>
        </li>
    ))
  }

  render(){
    const leftNav = {
      icon:'t-icon-angle-left',
      onClick:this.goBack
    }
    return(
      <div  className="home">
        <NavBar
          leftNav={leftNav}
          className="fixed-header-top"
          />
        <div>
          <img src="/imgs/vip_bg.png" className="vip-top-img"/>
          <div className="vip-top-text-panel"><div className="vip-top-text">感谢您对珈珈顺的支持！您可以从以下商品中任选一项作为赠品</div></div>
        </div>
        <div className="special clear">
          <ul className="goods-list">
            {this.renderGoods()}
          </ul>
        </div>
        <Menu />
      </div>
    )
  }
}

Vip.contextTypes = {
	router: React.PropTypes.object.isRequired
};
