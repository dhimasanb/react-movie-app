import React, {Component} from "react";
import Joi from "joi-browser";
import Input from "./common/input";
import Form from "./common/form";

class LoginForm extends Form {

    state = {
        data: {
            username: '',
            password: ''
        },
        errors: {}
    };

    schema = {
      username: Joi.string().required().label("Username"),
      password: Joi.string().required().label("Password"),
    };

    doSubmit = () => {
      console.log("Submit");
    };

    render() {
        const {data, errors} = this.state;

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        name="username"
                        value={data.username}
                        label="Username"
                        onChange={this.handleChange}
                        error={errors.username}
                    />
                    <Input
                        name="password"
                        value={data.password}
                        label="Password"
                        onChange={this.handleChange}
                        error={errors.password}
                    />
                    <button
                        className="btn btn-primary"
                        disabled={this.validate()}>
                        Login
                    </button>
                </form>
            </div>
        )
    }
}

export default LoginForm;