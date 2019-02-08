import React, { Component } from 'react';

import Login from '../Login/Login';
import Posts from '../Posts/Posts';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post_title: "",
            post_content: "",
            client_info: [],
            isLoggedIn: false, // keeps track if user is logged in or not
        }
    }

    // callback to get access token from Login
    obtainClientInfo(clientInfo) {
        this.setState({client_info: clientInfo});
        let accessToken = this.state.client_info.access_token;
        // if access_token is successfully passed, then user is logged in
        if (accessToken.length > 0) {
            this.setState({isLoggedIn: true});
            console.log('isLoggedIn = true');
        }
        console.log('Home', this.state.client_info);
        console.log('Home access token', accessToken);
    }

    render() {
        return (
            <div className="home">
                <h1>Home</h1>
                {this.state.isLoggedIn ? <Posts accessToken={this.state.client_info.access_token} /> : <Login obtainClientInfo={(clientInfo) => this.obtainClientInfo(clientInfo)} />}
            </div>
        );
    }
}

export default Home;