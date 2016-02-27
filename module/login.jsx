var React = require("react");


var Index = require("./index.jsx");

var Login = React.createClass({
	getInitialState:function(){
		return {
			islogin:false
		}
	},
	loginFN:function(){
		this.setState({islogin: !this.state.islogin});
	},
	render:function (){
		if (this.state.islogin) {
			return (<Index />)
		}else{
			return (
			<div className='login'><h1>用户登录</h1>
			<dl>
			<dt>帐号</dt>
			<dd>
				<input type="text" placeholder="请输入手机号码或者8位帐号" />
			</dd>
			</dl>
			<dl>
			<dt>密码</dt>
			<dd>
				<input type="password" placeholder="请输入密码" />
			</dd>
			</dl>
			<p><input onClick={this.loginFN} type="submit" value="立即登录" /></p>
			</div>)
		}
	}
})


module.exports = Login;