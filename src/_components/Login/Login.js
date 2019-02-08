import React, { Component } from 'react';
import { Button, Form } from "react-bootstrap";
import { browserHistory } from 'react-router';

import "./Login.css";

const API_info = 'http://192.168.0.18:8000/auth/token/';
const client_id_info = 'mYIHBd321Et3sgn7DqB8urnyrMDwzDeIJxd8eCCE';
const client_secret_info = 'qkFYdlvikU4kfhSMBoLNsGleS2HNVHcPqaspCDR0Wdrdex5dHyiFHPXctedNjugnoTq8Ayx7D3v1C1pHeqyPh1BjRlBTQiJYSuH6pi9EVeuyjovxacauGVeGdsBOkHI3';

// just to see my logs
function wait(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
        }
    }

    // checks if field inputs are not empty
    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    // sets the change depending whatever the controlId is with the value
    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    routeChange() {
        browserHistory.push('/posts');
    }

    // send to my API
    handleSubmit = e => {
        e.preventDefault();
        // json objects to be processed
        let data = {
            client_id: client_id_info,
            client_secret: client_secret_info,
            username: this.state.username,
            password: this.state.password,
            grant_type: 'password',
        }
        // fetches api url and then sends POST to API
        fetch(API_info, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        // passes the client info to Home component
        .then(json => {
            this.props.obtainClientInfo(json);
            console.log('Login', JSON.stringify(json));
        });
        //wait(10000);
    }

    render() {
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="username" bsSize="large">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            autoFocus
                            type="username"
                            value={this.state.email} // default value
                            onChange={this.handleChange.bind()}
                        />
                    </Form.Group>
                    <Form.Group controlId="password" bsSize="large">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={this.state.password} //default value
                            onChange={this.handleChange.bind()}
                        />
                    </Form.Group>
                    <Button 
                        block
                        bsSize="large"
                        // disabled if inputs are empty in validation
                        disabled={!this.validateForm()}
                        type="submit"
                        //onClick={this.routeChange.bind()} //binded so it wont rerender
                    >
                        Login
                    </Button>
                </form>
            </div>
        );
    }
  }
  
export default Login;