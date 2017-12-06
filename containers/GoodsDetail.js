import React, { Component } from 'react';
import classnames from 'classnames';
import Slider from 'react-slick';
import NavBar from '../components/NavBar/NavBar';
import { Link } from 'react-router';

import { GoodsHits,getGoodsDetail, Image_URL } from '../apis/'

const imageview = '?imageView2/0/w/500/h/500';

const  sliderSettings = {
  dots: true,
  infinite: true,
  arrows:false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

export default class GoodsDetail extends Component {
  constructor(props,context) {
    super(props)
    this.state = {
      data:props.location.state
    }
    this._router = context.router;
    this._user = this.props.user;
    this.goBack = this._router.goBack;
  }

  componentWillMount(){
    const query = {
      query:{
        goods_id:this.props.params.id
      }
    }
    getGoodsDetail(query,(rlt)=>{
      if(rlt.code == 1000 ){
        if(this._user.role_level == parseInt(rlt.data[0].vip) || parseInt(this._user.role_level) == 1){
          this.setState({
            data:rlt.data[0]
          })
        }else{
          this._router.replace('/');
        }
      }
    })
    GoodsHits(query,(rlt)=>{
    })
  }

  createMarkup(body){
    return {__html:  body};
  }


  render(){
    const { data } = this.state;
    const leftNav = {
      icon:'t-icon-angle-left',
      onClick:this.goBack
    }
    const rightNav = {
      icon:'t-icon-angle-left',
      style:{opacity:0}
    }
    if(!data) return <div>数据加载中。。。</div>;
    return(
      <div  className="goods-detail">
        <NavBar
          leftNav={leftNav}
          rightNav={rightNav}
          className="fixed-header-top"
          />
         <Slider className="goods-detail-header" {...sliderSettings}>
           <div className="item"><img src={`${Image_URL}${data.pic}${imageview}`} alt=""/></div>
         </Slider>
         <div className={classnames('info',data.cate_id == 15?'hide':'')}>
           <h4 className="title">{data.name}</h4>
           <p className="price">{data.amount}</p>
           <span className="m-price">积分：{data.price}</span>
           <span className="freight">运费: 免运费</span>
         </div>
         <div className="detail">
           <div className="title">商品描述</div>
           <div className="desc"  dangerouslySetInnerHTML={this.createMarkup(data.desc)}></div>
         </div>
         <footer className={classnames('goods-detail-footer',data.cate_id == 15?'hide':'')}>
           <div className="price">
             {data.amount}
           </div>
           <div className="tips">&nbsp;</div>
           <Link to={{pathname:`/firmorder/${data.goods_id}`,state:data}} className="pay-btn">立即兑换</Link>
         </footer>
      </div>
    )
  }
}

GoodsDetail.contextTypes = {
	router: React.PropTypes.object.isRequired
};
