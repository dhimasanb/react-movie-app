import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
    state = {
        data: {username: "", password: "", name: ""},
        errors: {}
    };

    schema = {
        username: Joi.string().required().email().label("Username"),
        password: Joi.string().required().min(5).label("Password"),
        name: Joi.string().required().label("Name")
    };

    doSubmit = async () => {
        try {
            const response = await userService.register(this.state.data);
            auth.loginWithJWT(response.headers["x-auth-token"]);
            window.location = "/";
        } catch (e) {
            if (e.response && e.response.status === 400) {
                const errors = {...this.state.errors};
                errors.username = e.response.data;
                this.setState({errors});
                console.log('error', errors);
            }
        }
    };

    render() {
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("name", "Name")}
                    {this.renderButton("Register")}
                </form>
            </div>
        );
    }
}

export default RegisterForm;
