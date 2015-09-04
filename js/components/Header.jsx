"use strict";

var React = require("react");
var Reflux = require('reflux');
var T = require('react-intl');
var HttpMixin = require("../mixins/Http");
var Utils = require("../Utils");

import {Router,Link,Navigation} from 'react-router'
import {ReactBootstrap, Navbar, Nav, NavItem, DropdownButton, MenuItem} from "react-bootstrap"

var Auth = require("./Auth");

var Header = React.createClass({
    mixins: [
        Navigation,
        HttpMixin
    ],
    getInitialState: function () {
        return {
            navLinks: [],
            barLinks: []
        };
    },
    componentDidMount: function () {
        this.get(Utils.url_for("/info", {keys: ["title", "links"]}), function (rs) {
            this.setState({
                navName: rs.title,
                navLinks: rs.links
            });
        });
        this.get(Utils.url_for("/personal/bar"), function (rs) {
            this.setState({
                barName: rs.label,
                barLinks: rs.links
            });
        });
    },
    render: function () {
        document.title = this.state.navName;
        return (
            <Navbar brand={<Link to="home"> {this.state.navName} </Link>} inverse fixedTop toggleNavKey={0}>
                <Nav right onSelect={this.transitionTo}> {}
                    {this.state.navLinks.map(function (obj) {
                        return (<NavItem key={"nav-" + obj.url} eventKey={obj.url}>{obj.label}</NavItem>)
                    })}
                    <DropdownButton title={this.state.barName}>
                        {this.state.barLinks.map(function (obj) {
                            return (<MenuItem eventKey={obj.url} key={"nav-" + obj.url}>{obj.label}</MenuItem>)
                        })}
                    </DropdownButton>
                </Nav>
            </Navbar>
        );

    }
});

module.exports = Header;