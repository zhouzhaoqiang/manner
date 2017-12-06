import React, { Component } from 'react';
import classnames from 'classnames';
import Slider from 'react-slick';

import Menu from '../../components/Menu'

import { Link } from 'react-router';
import _map from 'lodash/map';
import './style.scss'

import { getIndex, Image_URL } from '../../apis/'
import { getStrLen , JSubString } from '../../util/'

const imageview = '?imageView2/0/w/400/h/400';

const  sliderSettings = {
  dots: true,
  infinite: true,
  arrows:false,
  autoplay:true,
  speed: 500,
  swipe:true,
  // slidesToShow: 1,
  // slidesToScroll: 1
};

class Home extends Component{
  constructor(props,context) {
		super(props)
    this.state = {
      banner:null,
      visiacardlist:false,
      cate:[],
      recommend:[],
      special:[]
    }
    this._router = context.router;
	}

  componentDidMount(){
    getIndex((rlt)=>{
      if(rlt.code == '1000'){
        this.setState({...rlt.data});
      }
    })
  }

  renderRecommend(){
    return _map(this.state.recommend, t => (
      <div className="recommend clear" key={`recommend_${t.cate_id}`}>
        <img onClick={()=>{this.goDetail(t.cate_id)}} className="cate-image" src={`${Image_URL}${t.pic}`} alt=""/>
        <ul className="goods-list">
          {this.renderGoods(t.goods)}
        </ul>
      </div>
    ))
  }

  renderGoods(goods){
    return _map(goods,t =>(
      <li className="goods-item" key={`goods_${t.goods_id}`} onClick={()=>{this.goDetailDetail(t.goods_id)}}>
        <img  className="image" src={`${Image_URL}${t.pic}`} alt=""/>
        <div className="desc">
        <span className="name">{getStrLen(t.name) > 30 ? JSubString(t.name,30) : t.name}</span>
        <div>
          <span className="price">{t.price}</span>
          <a href="javascript:void(0);" className="pay-btn">兑换</a>
        </div>
        <span className="amount">积分:{t.amount}</span>
        </div>
      </li>
    ))
  }

  goDetail(id){
    this._router.push(`/goods/${id}`)
  }

  goDetailDetail(id){
    this._router.push(`/goods/detail/${id}`)
  }


    goCardList(){
      this._router.push(`/cardlist/18`)
    }

  /*
    render(){
      const { banner, cate, recommend, special } = this.state;
      return(
        <div  className="home">
          {banner?<Slider className="banner" {...sliderSettings}>
            {_map(banner,t =>(
              <a href={t.url} className="item" key={`banner_${t.banner_id}`}><img src={`${Image_URL}${t.pic}`} alt=""/></a>
            ))}
          </Slider>:''}
          <ul className="cates-box clear">
            {_map(cate,t =>(
              <li className="cate-item" key={`cate_${t.cate_id}`} onClick={()=>{this.goDetail(t.cate_id)}}>
                <img className="image" src={`../../imgs/cates/${t.cate_id}.png`} alt=""/>
                <span className="title">{t.name}</span>
              </li>
            ))}
          </ul>
          <div onClick={()=>{this.goCardList()}}>
            <img src="../../imgs/CardEnter.png" className="cardenter" />
          </div>
          <div className="special clear">
            <span className="title">特别推荐</span>
            <ul className="goods-list">
              {this.renderGoods(special)}
            </ul>
          </div>
          {this.renderRecommend()}
          <Menu />
        </div>
      )
    }
*/

  render(){
    const { banner, cate, recommend, special } = this.state;
    return(
      <div  className="home">
        {banner?<Slider className="banner" {...sliderSettings}>
          {_map(banner,t =>(
            <a href={t.url} className="item" key={`banner_${t.banner_id}`}><img src={`${Image_URL}${t.pic}`} alt=""/></a>
          ))}
        </Slider>:''}
        <ul className="cates-box clear">
          {_map(cate,t =>(
            <li className="cate-item" key={`cate_${t.cate_id}`} onClick={()=>{this.goDetail(t.cate_id)}}>
              <img className="image" src={`../../imgs/cates/${t.cate_id}.png`} alt=""/>
              <span className="title">{t.name}</span>
            </li>
          ))}
        </ul>
        <div className="special clear">
          <span className="title">特别推荐</span>
          <ul className="goods-list">
            {this.renderGoods(special)}
          </ul>
        </div>
        {this.renderRecommend()}
        <Menu />
      </div>
    )
  }
}

Home.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default Home;
