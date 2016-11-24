import React, { Component } from 'react';
import Entry from './Entry.js'
import './Blog.css'

class Blog extends Component{
  render(){
    const blogs  = this.props.blogs
    return <div className="blog">
      <h1 className="blogTitle">Travel Blog</h1>
      {blogs.map((e,i)=>{
        return <Entry key={i} title={e.title} text={e.text}/>
      })}
    </div>
  }
}

export default Blog
