import React from 'react';
import PropTypes from 'prop-types';
import {menuMobile} from '../../../data/menu';
import CLink from '../../components/elements/CLink';

const defaultProps = {
	seo  : {title : "Info Page" , pageDescription : "This is Info Page"},
	description : "",
    chunkJs : 'Info',
    pagination :{}
}


const contextTypes = {
    data: PropTypes.object
};

export default class Info extends React.Component {
    static fetchData(props, cb) {
        cb(defaultProps);
	}
    constructor(props , context){
        super(props , context);
        this.state = this.context.data || props;
    }
    render(){
        const getContent = () => {
            console.log(menuMobile)
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
            {/* <h3>Vertical Pills</h3> */}
            <ul class="info">
               
                {getContent()}   
            </ul>
          </div>
          
        )
    }
}  

Info.contextTypes = contextTypes;
Info.defaultProps = defaultProps;
