import React from 'react';
// import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';

const defaultProps = {
    default : true
}
function CLink(props){
    if(props.default){
        return(
            <Link
                to = { props.href}
                className = {props.className}
                // {...props}
            > {props.children}</Link>
        )
    }
    else{
        return(
            <a {...props}>{props.children}</a>
        )
    }
    
}
CLink.defaultProps = defaultProps;
export default CLink;