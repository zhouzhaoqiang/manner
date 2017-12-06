import React, { Component,PropTypes } from 'react';
import classnames from 'classnames';
import './navbar.scss'

export default class NavBar extends Component {
  constructor(props) {
    super(props)
  }

  renderCenter(){
    const {title,search,onSearch,placeholder} = this.props;
    if(!search){
      return <div className="navbar-title">{title}</div>;
    }
    return (
      <div className="navbar-search">
        <i className="search-icon t-icon-search-addon t-icon-2x"></i>
        <input className="search-area" type="search" placeholder={placeholder}/>
      </div>
    );

  }

  // componentWillReceiveProps(nextProps){
  //   console.log(this.props.search)
  //   console.log(nextProps.search)
  // }


  renderNav(position){
    const nav = this.props[position + 'Nav'];
    return nav ? this.renderNavItem(nav,position):null;
  }

  renderNavItem(item,pos){

    let navTitle  = item.title ? (
      <span className='nav-title' key="title">{item.title}</span>
    ):null;

    let navIcon = item.icon? (
      <i className={item.icon} key="icon"></i>
    ):null;

    const position = pos == 'left'?'nav-left':'nav-right';

    return(<div className={classnames('navbar-nav',position)} style={item.style} onClick={item.onClick}>{[navTitle,navIcon]}</div>)
  }

  render(){
    const { style,className } = this.props;
    return(
      <header className={classnames('navbar',className)} style={style}>
        {this.renderNav('left')}
        {this.renderCenter()}
        {this.renderNav('right')}
      </header>
    )
  }
}

NavBar.propTypes = {
  title:PropTypes.string,//和search只能二选一
  search:PropTypes.bool,//是否开启搜索条,开启search后，title则失效
  onSearch:PropTypes.func,
  leftNav:PropTypes.any,
  rightNav:PropTypes.any
}

NavBar.defaultProps = {
  search: false
}
