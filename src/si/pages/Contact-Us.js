import React from 'react';
import PropTypes from 'prop-types';
import ContactCard from  '../components/widgets/ContactCard';
import ContactForm from '../components/widgets/ContactForm'

const defaultProps = {
	seo  : {title : "Contact Page" , pageDescription : "This is Contact Page"},
	description : "",
    chunkJs : 'Contact',
    pagination :{}
}


const contextTypes = {
    data: PropTypes.object
};

export default class Contact extends React.Component {
    static fetchData(props, cb) {
        cb(defaultProps);
	}
    constructor(props , context){
        super(props , context);
        this.state = this.context.data || props;
    }
    render(){

        return(
            <div className="container mt-5">
                <div className="row m-lg-5">
                    <ContactForm />
                    <ContactCard />
                </div>
            </div>          
        )
    }
}  

Contact.contextTypes = contextTypes;
Contact.defaultProps = defaultProps;
