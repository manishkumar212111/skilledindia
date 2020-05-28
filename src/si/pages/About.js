import React from 'react';
import PropTypes from 'prop-types';
const description = "<p>Our story</p><p>We are bunch of techies , interior designers ,carpenters ,and other workmen that aim to deliver, turn key design solutions for urban and rural India. the team aims to be leading community of interior designers that are tech enabled and enable the smooth transition of the design and implementation of the work.<p></p>Thanks<p>Vishal raina</p>"
const defaultProps = {
	seo  : {title : "About Page" , pageDescription : "This is About Page"},
	description : "",
    chunkJs : 'About',
    pagination :{}
}


const contextTypes = {
    data: PropTypes.object
};

export default class About extends React.Component {
    static fetchData(props, cb) {
        cb(defaultProps);
	}
    constructor(props , context){
        super(props , context);
        this.state = this.context.data || props;
    }
    render(){

        return(
          <div class="container">
            <div dangerouslySetInnerHTML = {{ __html: description }} /> 
          </div>
          
        )
    }
}  

About.contextTypes = contextTypes;
About.defaultProps = defaultProps;
