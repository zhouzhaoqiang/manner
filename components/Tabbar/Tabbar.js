import React, { Component } from 'react';
import _map from 'lodash/map';
import classnames from 'classnames';
import './tabber.scss'

export default class Tabbar extends Component {
  constructor(props) {
    super(props)
  }

  renderItem(){
    	const { tabbars } = this.props;
      return tabbars && Array.isArray(tabbars) ?
      _map(tabbars,function(t,i){
			let Component = t.component || 'a';
			return(<li key={i} className={classnames(t.active?'active':null)}>
				<Component to={{pathname:t.link}} >
					<i className={t.icon}></i>
					<span className="tabbar-label">{t.title}</span>
				</Component>
			</li>)
		})
		: null;
  }

  render(){
    return(
      <div className="tabbar">
        <ul className="tabbar-tab">
					{this.renderItem()}
				</ul>
      </div>
    )
  }
}
