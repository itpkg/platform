"use strict";

var React = require("react");
var Reflux = require('reflux');
var T = require('react-intl');

var HttpMixin = require("../mixins/Http");
var Utils = require("../Utils");
var AuthStore = require("../stores/Auth");

import {Router,Link,Navigation} from 'react-router'
import {ReactBootstrap, Navbar, Nav, NavDropdown, MenuItem} from "react-bootstrap"

var Auth = require("./Auth");

var Header = React.createClass({
    mixins: [
        Navigation,
        Reflux.connect(AuthStore, 'token'),
        HttpMixin
    ],
    getInitialState: function () {
        return {
            barName: "",
            navLinks: [],
            barLinks: []
        };
    },
    componentDidMount: function () {
        this.get("/info", {keys: ["title", "links"]}, function (rs) {
            this.setState({
                navName: rs.title,
                navLinks: rs.links
            });
        });


        this.get("/personal/bar", undefined, function (rs) {
            this.setState({
                barName: rs.label,
                barLinks: rs.links
            });
        }, undefined, true);

    },
    render: function () {
        document.title = this.state.navName;

        return (
            <Navbar brand={<Link to="home"> {this.state.navName} </Link>} inverse fixedTop toggleNavKey={0}>
                <Nav right> {}
                    {this.state.navLinks.map(function (obj) {
                        return (<MenuItem key={"nav-" + obj.url} eventKey={obj.url}>{obj.label}</MenuItem>)
                    })}
                    <NavDropdown id="top-nav-personal-bar" title={this.state.barName}>
                        {this.state.barLinks.map(function (obj) {
                            return (<MenuItem href={'#'+obj.url} key={"nav-" + obj.url}>{obj.label}</MenuItem>)
                        })}
                    </NavDropdown>
                </Nav>
            </Navbar>
        );

    }
});

module.exports = Header;