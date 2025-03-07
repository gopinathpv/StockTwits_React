import React, { Component } from "react";
import axios from "axios";
import Layout from "./Layout";


import '../sass/list.scss'
import '../sass/searchbox.scss'


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      symbols: [],
      tweetsbody:[],
      searchres:'',
      isnotexist: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const searchTerm = event.target.value;
    this.setState({ value: searchTerm.toLowerCase()});
    
  }
  hans()
  {
     if(this.state.isnotexist === true){
      return "Enter valid input"
    }
    else {
      return null
    }
  }

  handleSubmit(event) {
  
    const key= this.state.value.toUpperCase();
    const sy= []
    for(let i=0;i<this.state.symbols.length;i++){
      sy.push(this.state.symbols[i].value)
    }
  
    if(this.state.value.length !== 0 && !sy.includes(key)){
          axios({
          url: "/api/data",
          method: "post",
          data: {
            value: this.state.value
          }
          }).then(response => {
            const tweet = response.data.tweetsdata;
            if(tweet.response.status === 404){
              this.setState({
                isnotexist:true
              })
            }
            if(tweet.response.status === 200){
                    const  newsymbol = {
                      value:this.state.value.toUpperCase(),
                      tweetlen:tweet.messages.length
                };
                this.setState({
                  isnotexist:false
                })
                this.state.symbols.push(newsymbol)
                for(let i= 0; i<tweet.messages.length;i++){
                    const newsymboltweets= {
                      symbolname: tweet.symbol.symbol,
                      symbolTweets: tweet.messages[i].body,
                      tweetUser : tweet.messages[i].user.username,
                      Userimg : tweet.messages[i].user.avatar_url,
                    }
                this.state.tweetsbody.push(newsymboltweets)
                }
              }
            this.setState({value:"",searchres:tweet.response.status})
        });
      }
    event.preventDefault();
  }

  deleteItems =(item) =>{
    const tweetsbody =  this.state.tweetsbody.filter(twee => twee.symbolname !== item.value)
    const symbols=this.state.symbols.filter(symb => symb.value !== item.value)
    this.setState({tweetsbody,symbols})
  }
 
  render() {
      const {
        searchres,
        isnotexist
      } = this.state;
     
    return (
      <div className="searchdiv">
          <form  onSubmit={this.handleSubmit} className="search">
                  <div> 
                      <input 
                      className="searchbox" 
                      type="text" 
                      onChange={this.handleChange} 
                      value={this.state.list} 
                      placeholder="Search Symbols Here"/>
                  </div>
                  <div>
                      <button 
                      className="add" 
                      type="submit"> 
                      Add Symbol
                      </button>
                  </div>
          </form> 

          {isnotexist &&(
            <div className="input"> {this.hans()}</div>
          )}
          

           {searchres === 200 &&  (
             <div className="sta">
            <Layout tweet={this.state.tweetsbody} symss= {this.state.symbols} deleteItems={this.deleteItems}/>
            </div>
           )}
            {searchres === 404 && (
            <Layout tweet={this.state.tweetsbody} symss= {this.state.symbols} deleteItems={this.deleteItems}/>
           )}
      </div>
    );
  }
}
export default Search;

