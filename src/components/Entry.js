import React, {Component} from 'react'
import './Entry.css'

class Entry extends Component{
  render(){
    return <div className="blog-item">
      <h3>{this.props.title}</h3>
      <p>{this.props.text}</p>
    </div>
  }
}

export default Entry
