"use strict";

var React = require('react');
import {Router, Route, DefaultRoute} from "react-router";

var Auth = require("./components/Auth");
var Site = require("./components/Site");
var Root = require("./components/Root");
var Message = require("./components/Message");

var Routes = (
    <Route handler={Root}>
        <DefaultRoute name="home" handler={ Site.Home }/>

        <Route name="about_us" path="/about_us" handler={ Site.AboutUs }/>

        <Route name="personal.sign_in" path="/personal/sign_in" handler={ Auth.SignIn }/>
        <Route name="personal.sign_up" path="/personal/sign_up" handler={ Auth.SignUp }/>
        <Route name="personal.forgot_password" path="/personal/forgot_password" handler={ Auth.ForgotPassword }/>
        <Route name="personal.change_password" path="/personal/change_password" handler={ Auth.ChangePassword }/>
        <Route name="personal.confirm" path="/personal/confirm" handler={ Auth.Confirm }/>
        <Route name="personal.unlock" path="/personal/unlock" handler={ Auth.Unlock }/>
        <Route name="personal.profile" path="/personal/profile" handler={ Auth.Profile }/>
        <Route name="message.show" path="/show" handler={ Message }/>
    </Route>
);

module.exports = Routes;