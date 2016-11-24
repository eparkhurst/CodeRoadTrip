import React, {Component} from 'react'

class Modal extends Component{
  render(){
    return <div className={this.props.className}>
      <h1>{this.props.current.title}</h1>
      <p>{this.props.current.text}</p>
    </div>
  }
}

export default Modal
