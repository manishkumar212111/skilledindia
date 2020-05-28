// 'use strict';

import React from 'react';
import Tabin from '../components/widgets/Tabin';
import {FooterMenuMobile} from '../../data/menu';
import Card from '../components/widgets/Card';
import API from '../utils/Api';
import CLink from '../components/elements/CLink';
import Simmer from '../components/elements/Simmer';
import PropTypes from 'prop-types';
import CardList from '../components/widgets/CardList';

const defaultProps = {
	activeIndex : 0,
	shimmer : true,
	seo  : {},
	blogs : {},
	projects : {},
	chunkJs : 'IndexPage'
}

var getData = (res) => {
	let o = {
		activeIndex : 0,
		seo : res.data.seo ? res.data.seo : defaultProps.seo,
		projects : res.data.projects ? res.data.projects : defaultProps.projects,
		shimmer : false,
		blogs : res.data.blogs ? res.data.blogs : defaultProps.blogs,
		chunkJs : 'IndexPage'
	};
	return o;
}

var getAPIResponse = (props ,cb) => {
	API.getApi('HomeAPI' , {} , false).then((res) =>{
		try{
			if(res.status === 200 && res.data){
			cb(getData(res));
			}
			else{
				console.log("API ERROR AT HOMEPAGE");
				cb({error : true, errorResp : "Invalid Response" });
			}
		} catch(e) {
			console.log("API ERROR AT HOMEPAGE");
			cb({error : true, errorResp : "Exception" });
		}
	})
}
const contextTypes = {
    data: PropTypes.object
};
export default class IndexPage extends React.Component {	
	static fetchData(props, cb) {
        // getApiResponse(props, function(res) {
        //     cb(res);  
		// });
		// cb({title: "testing"})
		API.getApi('HomeAPI' , {} , false).then((res) =>{
			try{
				if(res.status === 200 && res.data){
					cb(getData(res));
				}
			 
				else {
					console.log("API ERROR AT HOMEPAGE");
					cb({error : true});
				}
			} catch (e){
				console.log("API ERROR AT HOMEPAGE");
				cb({error : true});
		
			}
		})
	}
	
	constructor(props , context){
		super(props , context);
		this.state = this.context.data || defaultProps;
	}
	

	render(){
		
		return(
			<div class="main">
				Hello world
			</div>
			
		);
	}  
}

IndexPage.contextTypes = contextTypes;
IndexPage.defaultProps = defaultProps;