/* 
* @Author: willclass
* @Date:   2016-02-24 11:37:35
* @Last Modified by:   willclass
* @Last Modified time: 2016-02-24 21:03:01
*/

'use strict';

var React = require("react");
var Link = require('react-router').Link;






var Index = React.createClass({
	render:function(){
		return (
				<div className="index">
		 			<header>微信端</header>
		 			 <section>
		 			 	<Link to="/item/0">做一套题</Link>
		 			 </section>
		 	    </div>
			)

	}
});


module.exports = Index;