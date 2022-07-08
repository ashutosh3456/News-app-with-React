import React, { Component } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
   static defaultProps={
       country:"in",
       pageSize:5,
       category:"general"

   }
   static propsTypes={
       country:PropTypes.string,
       pageSize:PropTypes.number,
       category:PropTypes.string
   }
    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:false,
            page:1,
            totalResults:1
        }
        document.title=`${(this.props.category).charAt(0).toUpperCase() + (this.props.category).slice(1)} - Zinkket`;
    }
    async updateNews(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=74b8b461819f412da4f0c2e53065f496&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        // this.setState({loading:true})
        let data=await fetch(url);
        let parsedData=await data.json();
        this.setState({
            articles:parsedData.articles,
            totalResults:parsedData.totalResults,
            loading:false
        });
    }
    async componentDidMount(){
        this.updateNews()
        };
    
    
    fetchMoreData =async () => {
        this.setState({page:this.state.page+1})
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=74b8b461819f412da4f0c2e53065f496&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        //this.setState({loading:true})
        let data=await fetch(url);
        let parsedData=await data.json();
        this.setState({
            articles:this.state.articles.concat(parsedData.articles),
            totalResults:parsedData.totalResults,
            loading:false
        });
      };
  render() {
    return (
        <>
        <h2 className='text-center' style={{marginTop:'5rem',marginBottom:'3rem'}}>Zinkket - Top {(this.props.category).charAt(0).toUpperCase() + (this.props.category).slice(1) } Headlines</h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length!==this.state.totalResults}
            loader={<Spinner/>}
            >
            <div className="container">
                <div className="row">
                    {this.state.articles.map((element)=>(
                         <div className="col-md-4" key={element.url}>
                            <NewsItem  title={element.title} description={element.description} imageUrl={element.urlToImage} newsLink={element.url} author={element.author} date={element.publishedAt} newsSite={element.source.name}/>
                        </div>

                    ))}    
                </div>
            </div>
        </InfiniteScroll>
   
    </>
    )
  }
}

export default News;
