var React = require("react");
var ReactDOM = require("react-dom");




var List = React.createClass({
	getInitialState:function(){
		return {
			error:localStorage.getItem("error") ? JSON.parse(localStorage.getItem("error")) : 0
		}
	},
	render:function(){
		var list = this.state.error;
		var _this = this;
		if (list.length>0) {
			return (
				<section>
					<ul className="list" data-key="helo">
						{list.map(function(item){
							return <li data-qid={item.id}>{item.question}</li>
						})}
					</ul>
			  </section>
			)
		}else{
			return (<section>
					<i>暂无数据!</i>
				</section>
				)
		}
		
	}
});


module.exports = List;