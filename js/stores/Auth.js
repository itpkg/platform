"use strict";

var Reflux = require('reflux');
var $ = require("jquery");

var Actions = require('../actions/Auth');

var _key = "token";

var userStore = Reflux.createStore({
    listenables: Actions,
    getInitialState: function () {
        var val = sessionStorage.getItem(_key);
        if (val) {
            this.token = val;
        }
        return this.token;
    },
    onSignIn: function (token) {
        sessionStorage.setItem(_key, token);
        this.token = token;
        this.trigger(this.token);
    },
    onSignOut: function () {
        $.get(
            "/users/sign_out",
            function () {
                sessionStorage.removeItem(_key);
                this.token = undefined;
                this.trigger(this.token);
            }.bind(this),
            "json"
        );
    }
});

module.exports = userStore;