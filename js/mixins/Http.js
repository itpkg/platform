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

        if (bearer) {
            var token = sessionStorage.token;
            if (token) {
                args.headers = {
                    'Authorization': 'Bearer ' + token
                };
            }
        }
        $.ajax(args);
    },
    post: function (url, data, success, error) {
        if (error == undefined) {
            error = function () {
            };
        }
        $.ajax({
            url: this.url_for(url),
            success: success.bind(this),
            error: error.bind(this),
            data: data,
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8"
        });
    }
};

module.exports = Http;