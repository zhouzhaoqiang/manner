import React, { Component } from 'react';
import iScroll from 'iscroll';
import ReactIScroll from 'react-iscroll';
import classnames from 'classnames';
import _map from 'lodash/map';
import NavBar from '../components/NavBar/NavBar';

import { getPointsLogs } from '../apis/'

const iScrollOptions = {
  mouseWheel: true,
  scrollbars: false,
  click:true
}

export default class PointsLogs extends Component {
  constructor(props,context) {
    super(props)
    this.state = {
      data:[]
    }
    this._user = this.props.user;
    this._checkToken = this.props.checkToken;
    this._isMounted = true;
    this._router = context.router;
    this.goBack = this._router.goBack;
  }

  componentWillMount(){
    this._isMounted = this.props.checkLogin()
    const query = {
      token:this._user.token
    }
    getPointsLogs(query,(rlt)=>{
      this._checkToken(rlt)
      if(rlt.code == '1000'){
        this.setState({
          data:rlt.data
        })
      }
    })
  }

  renderPointsLogs(){
    const { data } = this.state;
    console.log(data)
    return (
      <ul className="points-logs-list">
        {
          _map(data,(t,i)=>{
            return (
              <li key={`points_logs${i}`} className="points-logs-item">
                <span className="title">{t.type==0?"购物消费-":"投保返现"}{t.points}积分</span>
                <p className="time">{t.create_at}</p>
                <span className={classnames('log-num',t.type==0?'active':'')}>{t.type==0?'-':'+'}{t.points}</span>
              </li>
            )
          })
        }

    </ul>
    )
  }

  render(){
    const leftNav = {
      icon:'t-icon-angle-left',
      onClick:this.goBack
    }
    const rightNav = {
      icon:'t-icon-angle-left',
      style:{opacity:0}
    }
    if(!this._isMounted) return null;
    return(
      <div id="wrapper" className="points-logs-box bg-gray-lighter">
        <NavBar
          className="bg-gray-lighter"
          title="我的积分"
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
            {this.renderPointsLogs() }

        </ReactIScroll>
      </div>
    )
  }
}

PointsLogs.contextTypes = {
	router: React.PropTypes.object.isRequired
};
