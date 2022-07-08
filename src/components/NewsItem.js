import React, { Component } from 'react';

export class NewsItem extends Component {
  
  render() {
    let {title,description,imageUrl,newsLink,author,date,newsSite}=this.props;
    return (
    <div>
        <div className="card mb-4" style={{width: "20rem" }}>
          <img src={!imageUrl ? "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg" : imageUrl} className="card-img-top" alt="..." style={{width:'20rem' , height:'12rem'}}/>
          <div className="card-body">
            <span className="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger" style={{top:'10px'}}>
             {newsSite}
              <span className="visually-hidden">unread messages</span>
            </span>
            <h5 className="card-title">{title}</h5>
            <p className="card-text" >{description}</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsLink} className="btn btn-dark">Read more....</a>
          </div>
        </div>
    </div>
    )
  }
}

export default NewsItem;
