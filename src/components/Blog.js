import React, { Component } from 'react';
import Entry from './Entry.js'
import './Blog.css'

class Blog extends Component{
  render(){
    const keys = Object.keys(this.props.giantObj)
    const blogs  = keys.reduce((p,c)=>{
      p.push(this.props.giantObj[c])
      return p
    },[])
    return <div className="blog">
      <h1 className="blogTitle">Travel Blog</h1>
      {blogs.map((e,i)=>{
        return <Entry toggleModal={this.props.toggleModal} index={e.id} key={i} title={e.title} text={e.text}/>
      })}
    </div>
  }
}

export default Blog
