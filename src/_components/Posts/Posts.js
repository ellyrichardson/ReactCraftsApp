import React, { Component } from 'react';

import PostItems from './postItems';

const API_url = 'http://192.168.0.18:8000/api/';

// just to see my logs
function wait(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

class Posts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
        }
    }

    // gets posts for current from the REST api
    listUserPosts() {
        fetch(API_url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.props.accessToken,
            }
        })
            .then(response => response.json())
            .then(json => {
                this.setState({posts: json})
                console.log('Posts', JSON.stringify(this.state.posts));
                console.log('Bearer ' + this.props.accessToken);
            })
    }

    componentDidMount() {
        this.listUserPosts();
    }

    render() {
        // lists every posts of the user logged in
        let postItemsVar = this.state.posts.map(post => {
            return (
                <PostItems key={post.id} post={post} />
            )
        })
        return (
            <div>
                <h1>Posts</h1>
                {postItemsVar}
            </div>
        );
    }
}

export default Posts;