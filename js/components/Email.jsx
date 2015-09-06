"use strict";

var React = require('react');
var T = require('react-intl');
import {Router,Link,Navigation} from 'react-router'

var W = require("./Widgets");
var HttpMixin = require("../mixins/Http");


module.exports = {
    Domains: React.createClass({
        mixins: [
            Navigation
        ],
        render: function () {
            return (
                <div className="row">
                    <W.Table source="/email/domains" bearer={true}/>
                </div>
            );
        }
    }),
    Users: React.createClass({
        mixins: [
            Navigation
        ],
        render: function () {
            return (
                <div className="row">
                    <W.Table source="/email/users" bearer={true}/>
                </div>
            );
        }
    }),
    Aliases: React.createClass({
        mixins: [
            Navigation
        ],
        render: function () {
            return (
                <div className="row">
                    <W.Table source="/email/aliases" bearer={true}/>
                </div>
            );
        }
    })
};