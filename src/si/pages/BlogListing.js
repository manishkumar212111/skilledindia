import React from 'react';
import {projectList} from '../../data/menu'
import Card from '../components/widgets/Card';
import API from '../utils/Api';
import PropTypes from 'prop-types';
import Simmer from '../components/elements/Simmer';
import Pagination from '../components/elements/Pagination'

const defaultProps = {
	shimmer : true,
	seo  : {title : "Blog Listing" , pageDescription : "This is page Description"},
	blogs : {},
    chunkJs : 'BlogListing',
    pagination :{}
}

var getData = (res) => {
	let o = {
		seo : res.data.seo ? res.data.seo : defaultProps.seo,
		blogs : res.data.blogs ? res.data.blogs : defaultProps.blogs,
        chunkJs : 'BlogListing',
        pagination : res.data.pagination ? res.data.pagination : defaultProps.pagination,
        shimmer:false
    };
    o.link = '/blogs/list'
    o.queryParam = '/'
	return o;
}

var getAPIResponse = (props ,cb) => {
    let options= {};
    if(props.location && props.location.pathname){
        options.page = props.location.pathname.split('/')[3];
    }

	API.getApi('BlogListing' , options , false).then((res) =>{
		if(res.status === 200 && res.data){
			cb(getData(res));
		}
		else{
			console.log("API ERROR AT BlogListingpage");
			cb({error : true});
		}
	})
}

const contextTypes = {
    data: PropTypes.object
};
export default class BlogListing extends React.Component {
    static fetchData(props, cb) {
        // getApiResponse(props, function(res) {
        //     cb(res);  
		// });
		// cb({title: "testing"})
        let options= {};
        if(props.location && props.location.pathname){
            options.page = props.location.pathname.split('/')[3];
        }
        API.getApi('BlogListing' , options , false).then((res) =>{
			if(res.status === 200 && res.data){
				cb(getData(res));
			}
			else {
				console.log("API ERROR AT HOMEPAGE");
				cb({error : true});
			}
		})
	}
    
    constructor(props,context){
        super(props,context);
        this.state = this.context.data ||props;
		this.fetchData = this.fetchData.bind(this);
    }
    componentDidMount(){
        
		if(window.__INITIAL_STATE__ == null)
			this.fetchData(this.props);
		else
			this.setState(window.__INITIAL_STATE__);
		
		window.__INITIAL_STATE__ = null;
    }

    fetchData(props){
		let self = this;
		this.setState({ shimmer : true });
		getAPIResponse(props , (res) => {
			self.setState(res);
		})
    }
    
    render(){

        if(this.state.shimmer){
			return(<Simmer />)
		}
        const getContentList = (items) =>{
			let h = [];
			items && items.map((item) => {
				h.push(<Card 
					items = {item}
				/>)
			})
			return h;
        }
        return(
            <div className="content-box">
                <div class="header-inner">
					<h4>Our blogs </h4>
				</div>
				<div className="row">
                	{getContentList(this.state.blogs)}
                </div>
				<Pagination items = {this.state.pagination  } link = {this.state.link} queryParam = {this.state.queryParam} />
            </div>
        )
    }
}  

BlogListing.contextTypes = contextTypes;
BlogListing.defaultProps = defaultProps;
