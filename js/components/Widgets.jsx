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

            //switch(obj.type){
            //case "select":
            //    console.log("select"+obj.value);
            //    break;
            //    default:
            //    data[obj.id] = obj.value;
            //        break;
            //}

        });
        switch (fm.method) {
            case "POST":
                this.post(
                    fm.action,
                    JSON.stringify(data),
                    function (result) {
                        if (result.ok) {
                            this.setState({
                                message: {
                                    title: result.title,
                                    style: "success",
                                    items: []
                                }
                            });
                            var clk = this.props.submit;
                            if (clk) {
                                clk(result);
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

        //console.log(item.id+" "+item.value);
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
                    if (obj.readonly) {
                        return (
                            <Input id={obj.id} value={obj.value} key={key} type={obj.type} placeholder={obj.placeholder}
                                   label={obj.label+":"}
                                   onChange={this.handleChange}
                                   readOnly
                                   labelClassName={lblCss} wrapperClassName={fldCss}/>);
                    } else {
                        return (
                            <Input id={obj.id} value={obj.value} key={key} type={obj.type} placeholder={obj.placeholder}
                                   label={obj.label+":"}
                                   onChange={this.handleChange}
                                   labelClassName={lblCss} wrapperClassName={fldCss}/>);
                    }
                case "password":
                    return (
                        <Input id={obj.id} key={key} type={obj.type} placeholder={obj.placeholder}
                               label={obj.label+":"}
                               onChange={this.handleChange}
                               labelClassName={lblCss} wrapperClassName={fldCss}/>);
                case "select":
                    return (
                        <Input id={obj.id} type="select" key={key} value={obj.value}
                               label={obj.label+":"}
                               onChange={this.handleChange}
                               labelClassName={lblCss} wrapperClassName={fldCss}
                            >
                            {
                                obj.options.map(function (opt) {
                                    return (<option key={"opt-"+opt.id} value={opt.id}>{opt.label}</option>)
                                })
                            }
                        </Input>
                    );
                default:
                    return (<input type="hidden" key={key}/>)
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
        return {table: {header: [], body: []}};
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
    onForm: function (result) {
        if (result.ok) {
            this.loadTable();
        }
    },
    onNew: function () {
        this.clearForm();
        React.render(<AjaxForm submit={this.onForm} source={this.state.table.action+"/new"} bearer={true}/>,
            document.getElementById(this.tid("fm")));
    },
    onRefresh: function () {
        this.clearForm();
        this.loadTable();
    },
    onRemove: function (id) {
        if (confirm(this.state.table.messages[0])) {
            this.delete(
                this.props.source + "/" + id,
                function (result) {
                    alert(result.title);
                    if (result.ok) {
                        this.loadTable();
                    }
                },
                undefined,
                this.props.bearer
            );
        }
    },
    clearForm: function () {
        React.unmountComponentAtNode(document.getElementById(this.tid("fm")));
    },
    onEdit: function (id) {
        this.clearForm();
        React.render(<AjaxForm submit={this.onForm} source={this.state.table.action+"/edit/"+id} bearer={true}/>,
            document.getElementById(this.tid("fm")));
    },
    tid: function (s) {
        return "table-" + s + "-" + this.state.table.id;
    },
    render: function () {
        var newW;
        var table = this.state.table;

        if (table.new) {
            newW = (<Button onClick={this.onNew} bsStyle="primary">{table.new}</Button>)
        } else {
            newW = (<a/>)
        }
        var removeBtn = function (row) {
            var remove = table.remove;
            if (remove) {
                return (<Button onClick={this.onRemove.bind(this, row[0])} bsStyle="danger">{remove}</Button>)
            } else {
                return (<a></a>)
            }

        }.bind(this);
        var viewBtn = function (row) {
            var view = table.view;
            if (view) {
                //todo add onclick
                return (<Button bsStyle="success">{view}</Button>)
            } else {
                return (<a></a>)
            }

        }.bind(this);
        var editBtn = function (row) {
            var edit = table.edit;
            if (edit) {
                return (<Button onClick={this.onEdit.bind(this, row[0])} bsStyle="warning">{edit}</Button>)
            } else {
                return (<a></a>)
            }
        }.bind(this);
        return (
            <div className="col-md-12 ">
                <p className="pull-right">
                    {newW}
                    <Button onClick={this.onRefresh} bsStyle="warning">{table.refresh}</Button>
                    <Back />
                </p>
                <br/>

                <p id={this.tid("fm")}></p>
                <fieldset>
                    <legend>{table.title}</legend>


                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            {table.header.map(function (obj) {
                                return (<th key={"th-"+obj.label} width={obj.width}>{obj.label}</th>)
                            })}
                            <th witdh="20%">{this.state.table.manage}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            table.body.map(function (row, rdx) {
                                return (
                                    <tr key={"tr-"+rdx}>
                                        {
                                            row.map(function (cell, cdx) {
                                                return (<td key={"td-"+rdx+"-"+cdx}>{cell}</td>)
                                            })
                                        }
                                        <td>
                                            {viewBtn(row)}
                                            {editBtn(row)}
                                            {removeBtn(row)}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>

                </fieldset>
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