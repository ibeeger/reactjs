var React = require("react");
var Link = require('react-router').Link;
var sina = "http://ww2.sinaimg.cn/mw600/";


var Chose = React.createClass({
	getInitialState:function(){
		var _curid;
		if (this.props.index) {
			_curid = this.props.index;
		}else{
			 if(localStorage.getItem("curid")){
				_curid = parseInt(localStorage.getItem("curid"));
			}else{
				_curid = 1;
			};
		};
		return {
			isload:false,
			data:null,
			curid:parseInt(_curid),
			isshowAnswer:false
		}
	},
	componentWillMount:function(){
		var _this = this;
		
		var index = this.props.list[(this.state.curid-1)];
		$.get("http://api.ibeeger.com/driving/"+index,function(data){
			_this.setState({data:data[0],isload:true});
		});
	},
	gonext:function(){
		var cid =(this.state.curid)
		var qcid =  this.props.list[cid-1];
			cid = cid+1;
		var _this = this;
		 this.setState({curid:cid,isload:false,data:null});
		 $.get("http://api.ibeeger.com/driving/"+qcid,function(data){
			_this.setState({data:data[0],isload:true,curid:cid,isshowAnswer:false});
			localStorage.setItem("curid",cid);
		});
	},
	showanswer:function(arg){
		var data = this.state.data;
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
					this.props.errorFN(error.length);
				}else{
					var error = [];
					error.push({
						id:this.state.curid,
						question:$("h3").text()
					});
					localStorage.setItem("error",JSON.stringify(error))
					this.props.errorFN(error.length);
				}
			}catch(e){
				console.log(e)
			}

		}
		if (!this.state.isshowAnswer) {
			$(arg.target).addClass("chose");
			this.setState({isshowAnswer:true})
			$("#answerlist li").eq(data.ta-1).addClass("right");
		};
	},
	reset:function(){
		localStorage.clear();
		location.reload();
	},
	render:function(){
		if (this.state.isload) {
			var pdt;
	 		var pic;
	 		var data = this.state.data;
	 		var gonext;
	 		var tips;
			if (this.state.isshowAnswer) {
				var best = data.bestanswer.replace("$#right","/")
	 			tips = <div className="tips">{best}</div>;
	 			gonext = <p><Link to={data.id}>下一题</Link></p>;
	 		}else{
	 			gonext = <p onClick={this.reset}>再来一套</p>;
	 		}
	 		if (data.sinaimg!="") {
	 			pic = <img src={sina+data.sinaimg} />
	 		}
	 		if (data.Type==1) {
	 			pdt = <ul className="qmain1"><li onTouch={this.showanswer}>对</li><li onClick={this.showanswer}>错</li></ul>
	 		}else{
	 			var a = data.a.replace("$#right","/");
	 			var b = data.b.replace("$#right","/");
	 			var c = data.c.replace("$#right","/");
	 			var d = data.d.replace("$#right","/");
	 			pdt = <ul className="qmain2"><li onTouch={this.showanswer}>{a}</li><li onClick={this.showanswer}>{b}</li><li onClick={this.showanswer}>{c}</li><li onClick={this.showanswer}>{d}</li></ul>
	 		};
		
			return (
			<div>
				<h3>{this.state.curid}.{data.question}</h3>
	 			{pic}
	 			<section id="answerlist">{pdt}</section>
	 			{tips}
	 			{gonext}
	 		</div>
			)
		}else{
			return(<section id="answerlist">loading...</section>)
		}
		
	}
});


module.exports = Chose;