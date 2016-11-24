import React, {Component} from 'react'
import './Entry.css'

class Entry extends Component{
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(){
    this.props.toggleModal(this.props.index)
  }
  render(){
    return <div className="blog-item" onClick={this.handleClick}>
      <h3>{this.props.title}</h3>
      <p>{this.props.text}</p>
    </div>
  }
}

export default Entry
