import React, {Component} from 'react';

import { 
    ErrorImageOverlay, 
    ErrorImageContainer, 
    ErrorImageText 
} from './error-boundary.styles';

class ErrorBoundary extends Component {
    constructor() {
        super();

        this.state = {
            hadErrored: false
        }
    }
    static getDerivedStateFromError(error) {
        //process the error
        return { hadErrored: true};
    }

    componentDidCatch(error, info) {
        console.log(error);
    }

    render() {
        if(this.state.hadErrored) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl='https://i.imgur.com/A040Lxr.png' />
                    <ErrorImageText>Sorry this page is broken</ErrorImageText>
                </ErrorImageOverlay>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;