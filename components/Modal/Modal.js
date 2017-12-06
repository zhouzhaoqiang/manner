import React, { Component } from 'react';
import classnames from 'classnames';
import './modal.scss';

export default class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen:props.isOpen
    }
    this.close = this.close.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      isOpen:nextProps.isOpen
    })
  }

  close(){
    this.props.handleChancel && this.props.handleChancel()
  }

  render(){
    const { isOpen } = this.state;
    const { children } = this.props;
    return(
      <div className={classnames('modal-container',isOpen?'active':null)}>
        <div className="modal-overlay" ></div>
        <div className="modal-inner">
          <div className="model">
            <i className="close-btn" onClick={this.close}></i>
            { children }
          </div>
        </div>
      </div>
    )
  }
}
