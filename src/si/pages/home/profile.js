import React from 'react';
import PropTypes from 'prop-types';
import {menuMobile} from '../../../data/menu';
import CLink from '../../components/elements/CLink';

const defaultProps = {
	seo  : {title : "Profile Page" , pageDescription : "This is Profile Page"},
	description : "",
    chunkJs : 'Profile',
    pagination :{}
}

const contextTypes = {
    data: PropTypes.object
};

export default class Profile extends React.Component {
    static fetchData(props, cb) {
        cb(defaultProps);
	}
    
    constructor(props , context){
        super(props , context);
        this.state = this.context.data || props;
    }

    render(){
        const getContent = () => {
            let h = [];
            menuMobile.map((item) =>{
                h.push(
                    <li>
                        <CLink href={item.link}>{item.title}</CLink>
                    </li>  
                )
            })
            return h;
        }
        
        return(
            <div class="container">
            <ul class="profile">    
                {getContent()}   
            </ul>
          </div>
          
        )
    }
}  

Profile.contextTypes = contextTypes;
Profile.defaultProps = defaultProps;
