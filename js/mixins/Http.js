"use strict";

var $ = require("jquery");
var URI = require('URIjs');

var Http = {
    url_for: function (url, params) {
        if (!params) {
            params = {};
        }
        params.locale = localStorage.lang;
        return URI(url).query({}).query(params);
    },
    check_token: function (bearer, args) {
        if (bearer) {
            var token = sessionStorage.token;
            if (token) {
                args.headers = {
                    'Authorization': 'Bearer ' + token
                };
            }
        }
    },
    get: function (url, params, success, error, bearer) {

        if (error == undefined) {
            error = function () {
            };
        }

        var args = {
            url: this.url_for(url, params),
            success: success.bind(this),
            error: error.bind(this),
            type: "GET",
            dataType: "json"
        };
        this.check_token(bearer, args);

        $.ajax(args);
    },
    post: function (url, data, success, error, bearer) {
        if (error == undefined) {
            error = function () {
            };
        }
        var args = {
            url: this.url_for(url),
            success: success.bind(this),
            error: error.bind(this),
            data: data,
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8"
        };
        this.check_token(bearer, args);
        //console.log(args);
        $.ajax(args);
    }
};

module.exports = Http;