"use strict";

var URI = require('URIjs');

module.exports = {
    url_for: function (url, params) {
        if (!params) {
            params = {};
        }
        params.locale = localStorage.lang;
        return URI(url).query({}).query(params);
    },
    gup: function (name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(url);
        return results == null ? null : results[1];
    },
    getQueryParams: function (qs) {
        qs = qs.split('+').join(' ');

        var params = {},
            tokens,
            re = /[?&]?([^=]+)=([^&]*)/g;

        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }
        return params;
    }
};