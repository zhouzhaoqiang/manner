import React, { Component } from 'react'
import classnames from 'classnames';
import './style.scss'

import Menu from '../../components/Menu'
import { Link } from 'react-router';

import _map from 'lodash/map';

import { getActivity, Image_URL } from '../../apis/'
const imageview = '';//?imageView2/0/w/400/h/400';


export default class Activity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data:[]
    }
  }
  
  componentDidMount(){
    getActivity(rlt=>{
      if(rlt.code == '1000'){
        this.setState({data:rlt.data})
      }
    })
  }

  render(){
    return(
      <div className="activity-box">
        {_map(this.state.data, t=>(
          <Link to={{pathname:`/goods/detail/${t.goods_id}`}} className="activity" key={`activity_${t.activity_id}`}>
            <img src={`${Image_URL}${t.activity_img}${imageview}`} alt=""/>
          </Link>
        ))}
        <Menu />
      </div>
    )
  }
}