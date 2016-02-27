/* 
* @Author: willclass
* @Date:   2016-02-17 15:36:26
* @Last Modified by:   willclass
* @Last Modified time: 2016-02-24 20:42:54
*/

'use strict';

var React = require("react");

// import React from "react";

var ReactDOM = require("react-dom");
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory =  require('react-router').browserHistory;

var Index = require("./index.js");
var Item = require("./item.js");
var Result = require("./result.js");
var NoMatch = require("./error.js");

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Index} >
    </Route>
    <Route path="/item/:itemid" component={Item} />
    <Route path="/result" component={Result} />
	<Route path="*" component={NoMatch} />
  </Router>
),document.getElementById('main'));