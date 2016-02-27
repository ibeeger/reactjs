/* 
* @Author: willclass
* @Date:   2016-02-17 15:36:26
* @Last Modified by:   willclass
* @Last Modified time: 2016-02-24 11:32:43
*/

'use strict';

var React = require("react");

// import React from "react";

var ReactDOM = require("react-dom");

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory =  require('react-router').browserHistory;

var chose = require("./chose.js");


// var css = require("../assets/css/common.css");


var Index = require("./index.jsx");


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Index}>
        <Route path="/:userId" component={chose}/>
    </Route>
  </Router>
),document.getElementById('main'));