import React, { Component } from 'react';
import iScroll from 'iscroll';
import ReactIScroll from 'react-iscroll';
import NavBar from '../components/NavBar/NavBar';
import Menu from '../components/Menu'
import classnames from 'classnames';
import { Link } from 'react-router';
import _map from 'lodash/map';

import { getCatesList, Image_URL } from '../apis/'

const imageview = '';//?imageView2/0/w/400/h/400';

const iScrollOptions = {
  mouseWheel: true,
  scrollbars: false,
  click:true
}

class Cates extends Component{
  constructor(props) {
		super(props)
    this.state = {
      data:[]
    }
	}

  componentDidMount(){
    getCatesList((rlt)=>{
      if(rlt.code == '1000'){
        this.setState({
          data:rlt.data
        })
      }
    })
  }


  renderCates(lists){
    return _map(this.state.data,(t,i)=>{
        return (
          <Link to={{pathname:`/goods/${t.cate_id}`,state:t}} className="cate-item" key={`cate_${t.cate_id}`} >
            <img src={`${Image_URL}${t.pic}${imageview}`} alt=""/>
            <span></span>
          </Link>
        )
    })
  }

  render(){

    return(
      <div id="wrapper">
        <NavBar
          className="bg-orange"
          title="商城分类"
          />
        <ReactIScroll
          ref={(r)=>{
            this._iScroll = r;
          }}
          iScroll={iScroll}
          options={iScrollOptions}
          >
          <div className="home-box">
            {this.renderCates()}
          </div>
        </ReactIScroll>
        <Menu />
      </div>
    )
  }
}

export default Cates;
