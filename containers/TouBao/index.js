import React, { Component } from 'react';
import Menu from '../../components/Menu'
import { Link } from 'react-router';
import classnames from 'classnames';
import $ from 'jquery';
import './style.scss'


import { Image_URL,API_URL } from '../../apis/'

export default class TouBao extends Component {
  constructor(props) {
    super(props)
    this.imgHome = this.imgHome.bind(this);
    this.path= '';
  }

  imgHome() {
    $.ajax({
      url: `${API_URL}setting/banner`,
      type: 'GET',
      success:(rlt)=>{
        this.path= `${Image_URL}/${rlt.data.value}`
      },
      async: false,
      error: (err) =>{
        console.log(err);
      }
    });
  }

  render(){
    this.path==''?this.imgHome():null;

    return(
      <div  className='toubao-box bg-gray-lighter'>
        <img src={ this.path } style={{ 'position': 'fixed', 'top': 0, 'left': 0,'width':'100%','height':$(window).height()+'px','zIndex':999, }}></img>
        <Menu />
      </div>
    )
  }
}
