/* 
* @Author: willclass
* @Date:   2016-02-24 11:46:05
* @Last Modified by:   willclass
* @Last Modified time: 2016-02-26 16:54:04
*/

'use strict';

var React = require("react");
var Link = require('react-router').Link;
var arr = require("./array.js").create(1228);
	arr =arr.slice(0,100);
var sina = "http://ww2.sinaimg.cn/mw600/";

var Item = React.createClass({
	getInitialState:function(){
		return {data:null,isload:false,isshowAnswer:false,curid:parseInt(this.props.params.itemid)}
	},
	componentDidMount:function(){
		 var index = parseInt(this.state.curid);
		 var _this = this;
		 var cid = arr[index];
		 $.get("http://api.ibeeger.com/driving/"+cid,function(data){
			_this.setState({data:data[0],isload:true,curid:(index+1),isshowAnswer:false});
		});
	},
	componentWillReceiveProps:function(nextpty){
		 var index = parseInt(nextpty.params.itemid);
		 this.setState({curid:index+1})
		 var _this = this;
		 var cid = arr[index];
		 $.get("http://api.ibeeger.com/driving/"+cid,function(data){
			_this.setState({data:data[0],isload:true,curid:(index+1),isshowAnswer:false});
		});
	},
	showanswer:function(arg){
		var data = this.state.data;
		console.log(data.ta-1);
		var _this = this;
		if ($(arg.target).index() != (data.ta-1)) {
			try{
				if (localStorage.getItem("error")!=null) {
					var error = JSON.parse(localStorage.getItem("error"));
					error.map(function(index){
						if (index.id == _this.state.curid) {
							return;
						}
					})
					error.push({
						id:this.state.curid,
						question:$("h3").text()
					});
					localStorage.setItem("error",JSON.stringify(error));
				}else{
					var error = [];
					error.push({
						id:this.state.curid,
						question:$("h3").text()
					});
					localStorage.setItem("error",JSON.stringify(error))
				}
			}catch(e){
				console.log(e)
			}
		};

		if (!this.state.isshowAnswer) {
			
			$(arg.target).addClass("chose");
			$("#answerlist li").eq(data.ta-1).addClass("right");
			this.setState({isshowAnswer:true})
		}
	},
	render:function(){
		var data = this.state.data;
		
	 	if (this.state.isload) {
	 		var pdt,tips,gonext,pic;
	 		var qtit = data.question;
	 		var _index = this.state.curid;
		 	var to = "/item/"+_index;
		 	var result = "/result";
		 			

	 		if (data.sinaimg!="") {
	 			pic = <img src={sina+data.sinaimg} />
	 		}
	 		
			if (data.Type==1) {
		 			pdt = <ul id="answerlist"><li onTouchEnd={this.showanswer}>对</li><li onTouchEnd={this.showanswer}>错</li></ul>
		 		}else{
		 			var a = data.a.replace("$#right","/");
		 			var b = data.b.replace("$#right","/");
		 			var c = data.c.replace("$#right","/");
		 			var d = data.d.replace("$#right","/");
		 			pdt = <ul id="answerlist"><li onTouchEnd={this.showanswer}>{a}</li><li onTouchEnd={this.showanswer}>{b}</li><li onTouchEnd={this.showanswer}>{c}</li><li onTouchEnd={this.showanswer}>{d}</li></ul>
		 		};
		 	if (this.state.isshowAnswer) {
					var best = data.bestanswer.replace("$#right","/");
		 			tips = <div className="tips">{best}</div>;
		 			if (_index<99) {
		 				gonext = <p><Link to={to} >下一题</Link></p>;
		 			}else{
		 				gonext = <p><Link to={result} >交卷</Link></p>;
		 			}
		 			
		 		}else{
		 			$("#answerlist li").removeClass();
		 		}
	 		return (
				<div className="index">
		 			<header>微信端</header>
		 			<h3>{_index}.{qtit}</h3>
		 			{pic}
		 			 <section>
		 			 	 {pdt}
		 			 </section>
		 			 {tips}
		 			  {gonext}
		 	    </div>
			)
	 	}else{
	 		return (
				<div className="index">
		 			<header>微信端</header>
		 			 <section>
		 			 	 loading
		 			 </section>

		 	    </div>
	 		)
	 	}
		
	}
});


module.exports = Item;
