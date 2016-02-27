var React = require("react");
var ReactDOM = require("react-dom");

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory =  require('react-router').browserHistory;

var Arr = require("./array.js");

var Chose = require("./chose.js");

var List = require("./list.js");



var Index = React.createClass({
	getInitialState:function(){
		var _showerror =localStorage.getItem("error") ? JSON.parse(localStorage.getItem("error")).length : 0;
		var _list = Arr.create(1228);
		_list = _list.slice(0,100);
		return {
			showerror:_showerror,
			ishow:false,
			qid:0,
			list:_list
		}
	},
	showerror:function(){
		if (localStorage.getItem("error")) {
			this.setState({ishow:true,showerror:JSON.parse(localStorage.getItem("error")).length});
		}
	},
	hideerror:function(arg){
		arg.preventDefault();
		if (arg.target.tagName == "LI" && $(arg.target).data("qid")) {
			this.setState({ishow:false,qid:parseInt($(arg.target).data("qid"))});
		}else{
			this.setState({ishow:false,qid:0})
		}
	},
	showerrorEnter:function(key){
		this.setState({showerror:key})
	},
	 render:function(d){
	 		var errorLink;
	 		var showQs;
	 		var back = <a onClick={this.hideerror} className="linkerror">返回</a>
	 		if (this.state.showerror !=0) {
	 			errorLink = <a onClick={this.showerror} className="linkerror"><i>{this.state.showerror}</i><span  className='ico-quill'>&nbsp;</span></a>;
	 		};
	 		if (this.state.qid>0) {
	 			showQs = <Chose index={this.state.qid}  />
	 		}else{
	 			showQs = <Chose list={this.state.list} errorFN={this.showerrorEnter} />
	 		}
	 		if (this.state.ishow) {
				return(
					<div className="index">
						<header>错题 {back}</header>
						<List hidefn={this.hideerror} />
					</div>
				)
	 		}else{
	 			return (
		 			<div className="index">
		 			<header>驾考宝典 {errorLink}</header>
		 			{showQs}
		 			</div>
	 			);
	 		}
	 		
	 	
	 }
})

module.exports = Index;