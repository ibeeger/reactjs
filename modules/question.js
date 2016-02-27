/* 
* @Author: willclass
* @Date:   2016-02-24 15:20:52
* @Last Modified by:   willclass
* @Last Modified time: 2016-02-24 16:34:00
*/

'use strict';

var React = require("react");
var Link = require('react-router').Link;
var arr = require("./array.js").create(1228);
	arr =arr.slice(0,99);

var Item = require("./item.js");

var Question = React.createClass({
	getInitialState:function(){
		
		return {
			curid:parseInt(this.props.params.itemid),
			nexid:parseInt(this.props.params.itemid)+1,
			showNext:parseInt(this.props.params.itemid)+1,
		}
	},
	componentWillReceiveProps:function(nextprops){
		this.setState({
			curid:parseInt(nextprops.params.itemid),
			nexid:parseInt(nextprops.params.itemid)+1,
			showNext:parseInt(nextprops.params.itemid)+1
		});
		
	},
	render:function(){
		var _to = "/item/"+(this.state.nexid);
		
		return(
				<div className="index">
		 			<header>微信端</header>
			 		
		 			<section>{this.state.showNext}.{this.state.nexid}</section>
		 			<p><Link to={_to} >next</Link></p>
		 	    </div>

			)
	}
});

module.exports = Question;