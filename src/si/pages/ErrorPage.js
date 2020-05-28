import React from 'react';
import CLink from '../components/elements/CLink';

const defaultProps = {Error : true , chunkJs : 'ErrorPage'};

export default class ErrorPage extends React.Component {
    static fetchData(props,cb){
        cb(defaultProps);
    }
    constructor(props){
        super(props);
        this.state = defaultProps;
    }

    render(){
        return(
            <div className="errorpage">
                Error code : 500
                <CLink href="/" default={true}>GO TO HOME</CLink>
            </div>
        )
    }
}

ErrorPage.defaultProps = defaultProps;