/* 
* @Author: willclass
* @Date:   2016-02-24 16:55:17
* @Last Modified by:   willclass
* @Last Modified time: 2016-02-26 17:07:15
*/

'use strict';

var React = require("react");
var Link = require('react-router').Link;
function formatTime(){
	var s = new Date();
	return s.getFullYear()+""+(s.getMonth()+1)+""+s.getDate();
}


var error = React.createClass({
	getInitialState:function(){
		var errors = localStorage.getItem("error");
		errors = JSON.parse(errors);
		var msg,style;
		if (!errors || errors.length<10) {
			msg="恭喜你";
			style="ico-happy";
		}else{
			msg="很遗憾";
			style="ico-sad";
		};
		localStorage.clear();
		return {
			score: !errors ? 100 : (100 - errors.length),
			msg:msg,
			style:style
		};
	},
	render:function(){
		return (
				<div className="index">
		 			<header>微信端</header>
		 			 <section>
		 			 <h3 id="ico"><i  className={this.state.style}></i></h3>
		 			 <div className="txt">{this.state.msg}<br />{this.state.score}分
		 			 </div>
		 			 </section>
		 			 <p><Link to="/item/0" >再来一套</Link></p>
		 	    </div>
			)
	}
})


module.exports = error;