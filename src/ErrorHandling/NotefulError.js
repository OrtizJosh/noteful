import React, { Component } from 'react';

export default class NotefulError extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorFound: false
        };
    }
    static getDerivedStateFromError(error) {
        return { errorFound: true };
    }

    render() {
        if (this.state.errorFound) {
            return (
                <div>
                    <h2>There has been an error with this process.</h2>
                </div>
            );
        }
        return this.props.children;
    }
}
