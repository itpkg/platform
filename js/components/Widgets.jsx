"use strict";

var React = require("react");
var T = require('react-intl');
import {Navigation} from 'react-router'
import {Nav, Table, NavItem,NavDropdown,MenuItem, ReactBootstrap, Input, Button,ButtonInput, ButtonToolbar, Alert} from "react-bootstrap"

var HttpMixin = require("../mixins/Http");


var AjaxForm = React.createClass({
    mixins: [T.IntlMixin, HttpMixin],
    getInitialState: function () {
        return {form: {fields: [], buttons: []}}
    },
    componentDidMount: function () {
        this.get(
            this.props.source,
            undefined,
            function (result) {
                if (this.isMounted()) {
                    this.setState({form: result});
                }
            },
            function (httpObj) {
                this.setState({message: {style: 'danger', items: [httpObj.statusText]}});
            },
            this.props.bearer
        );

    },
    handleSubmit: function (e) {
        e.preventDefault();
        var data = {};
        var fm = this.state.form;
        fm.fields.map(function (obj) {
            data[obj.id] = obj.value;
        });
        switch (fm.method) {
            case "POST":
                this.post(
                    fm.action,
                    JSON.stringify(data),
                    function (result) {
                        if (result.ok) {
                            var clk = this.props.submit;
                            if (clk) {
                                clk(result.data);
                            } else {
                                this.setState({
                                    message: {
                                        title: result.title,
                                        style: "success",
                                        items: result.data
                                    }
                                });
                            }
                        } else {
                            this.setState({
                                message: {
                                    title: result.title,
                                    style: "danger",
                                    items: result.errors
                                }
                            });
                        }
                    },
                    function (httpObj) {
                        this.setState({message: {style: 'danger', items: [httpObj.statusText]}});
                    },
                    this.props.bearer
                );
                break;
            default:
                console.log("unsupported http method " + fm.method);
        }
    },
    handleChange: function (e) {
        var item = e.target;
        var fm = this.state.form;
        fm.fields.map(function (obj) {
            if (obj.id == item.id) {
                obj.value = item.value;
            }
        });

        this.setState({form: fm});
    },
    render: function () {
        var fm = this.state.form;
        var data = this.state.data;
        var fields = fm.fields.map(function (obj) {
            var key = fm.id + "-" + obj.id;
            var lblCss = "col-sm-3";
            if (obj.required) {
                lblCss += " required";
            }
            var fldCss = "col-sm-" + obj.size;
            switch (obj.type) {
                case "hidden":
                    return (<input value={obj.value} key={key} type="hidden"/>);
                case "text":
                case "email":
                    return (
                        <Input id={obj.id} value={obj.value} key={key} type={obj.type} placeholder={obj.placeholder}
                               label={obj.label+":"}
                               onChange={this.handleChange}
                               labelClassName={lblCss} wrapperClassName={fldCss}/>);
                case "password":
                    return (
                        <Input id={obj.id} key={key} type={obj.type} placeholder={obj.placeholder}
                               label={obj.label+":"}
                               onChange={this.handleChange}
                               labelClassName={lblCss} wrapperClassName={fldCss}/>);
                default:
                    return (<input key={key}/>)
            }
        }.bind(this));

        var buttons = fm.buttons.map(function (obj) {
            var key = fm.id + "-" + obj.id;
            return (
                <Button id={key} key={key} bsStyle={obj.style}>
                    {obj.name}
                </Button>
            );
        }.bind(this));

        var message = (<div/>);
        if (this.state.message) {
            var msg = this.state.message;
            message = (
                <Alert bsStyle={msg.style}>
                    <strong>{msg.title}</strong>

                    <p>
                        <ul>
                            {msg.items.map(function (obj, i) {
                                return (<li key={"err-"+i}>{obj}</li>)
                            })}
                        </ul>
                    </p>
                </Alert>
            );
        }

        return (
            <fieldset>
                <legend className="glyphicon glyphicon-list">
                    {fm.title}
                </legend>
                {message}
                <form className='form-horizontal' method={fm.method} action={fm.action}>
                    {fields}
                    <div className="form-group">
                        <div className="col-sm-offset-3 col-sm-9">
                            <ButtonInput groupClassName="col-sm-2" type="submit" bsStyle="primary" value={fm.submit}
                                         onClick={this.handleSubmit}/>
                            {buttons}
                            <ButtonInput groupClassName="col-sm-2" type="reset" bsStyle="default" value={fm.reset}/>

                        </div>
                    </div>
                </form>
            </fieldset>
        )


    }
});


var AjaxNavBar = React.createClass({
    mixins: [HttpMixin],
    getInitialState: function () {
        return {links: []};
    },
    componentDidMount: function () {

        this.get(
            this.props.source,
            undefined,
            function (result) {
                if (this.isMounted()) {
                    this.setState({links: result.links});
                }
            },
            undefined,
            this.props.bearer
        );

    },
    render: function () {
        var links = this.state.links.map(function (obj) {

            return (
                <NavDropdown key={"ndd-"+obj.label} title={obj.label} id={"ndd-"+obj.label}>
                    {obj.links.map(function (lk) {
                        return (
                            <MenuItem href={'#'+lk.url} key={"key-"+lk.url}>
                                {lk.label}
                            </MenuItem>
                        )
                    })}
                </NavDropdown>
            );


        });
        return (
            <Nav bsStyle='tabs'>
                {links}
            </Nav>
        );
    }
});

var Back = React.createClass({
    mixins: [Navigation, T.IntlMixin],
    go_back: function () {
        window.history.back();
    },
    render: function () {
        return (
            <Button onClick={this.go_back} bsStyle='success'>{this.getIntlMessage('links.go_back')}</Button>

        )
    }
});


var AjaxTable = React.createClass({
    mixins: [Navigation, HttpMixin],
    getInitialState: function () {
        return {table: {header: []}};
    },
    loadTable: function () {
        this.get(
            this.props.source,
            undefined,
            function (result) {
                if (this.isMounted()) {
                    this.setState({table: result});
                }
            },
            undefined,
            this.props.bearer
        );
    },
    componentDidMount: function () {
        this.loadTable();
    },
    onNew: function () {
        React.render(<AjaxForm source={this.state.table.action+"/new"} submit={this.loadTable} bearer={true}/>,
            document.getElementById(this.tid("fm")));
    },
    onRefresh: function () {
        this.loadTable();
        //this.transitionTo(this.state.table.action);
    },
    tid: function (s) {
        return "table-" + s + "-" + this.state.table.id;
    },
    render: function () {
        var newW;
        if (this.state.table.new) {
            newW = (<Button onClick={this.onNew} bsStyle="primary">{this.state.table.new}</Button>)
        } else {
            newW = (<a/>)
        }
        return (
            <div className="col-md-12 ">
                <p className="pull-right">
                    {newW}
                    <Button onClick={this.onRefresh} bsStyle="warning">{this.state.table.refresh}</Button>
                    <Back />
                </p>
                <br/>

                <p id={this.tid("fm")}></p>

                <p>
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            {this.state.table.header.map(function (obj) {
                                return (<th key={"th-"+obj.label} width={obj.width}>{obj.label}</th>)
                            })}
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </Table>
                </p>
            </div>
        );
    }
});


module.exports = {
    Form: AjaxForm,
    NavBar: AjaxNavBar,
    Table: AjaxTable,
    Back: Back
};