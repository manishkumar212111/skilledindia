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
	description : "",
    chunkJs : 'BlogDetail',
    pagination :{}
}

var getData = (res) => {
	let o = {
		seo : res.data.seo ? res.data.seo : defaultProps.seo,
		blog : res.data.description ? res.data.description : defaultProps.description,
        chunkJs : 'BlogDetail',
        shimmer:false
    };
    return o;
}

var getAPIResponse = (props ,cb) => {
    let options= {};
    if(props.location && props.location.pathname){
        options.id = props.location.pathname.split('/')[3];
    }

	API.getApi('BlogDetail' , options , false).then((res) =>{
        if(res.status === 302 && res.redirect){
            cb({
                status : 302 ,
                url : res.redirect
            });
        }
        if(res.status === 200 && res.data){
			cb(getData(res));
		}
		else{
			console.log("API ERROR AT BlogDetailpage");
			cb({error : true});
		}
	})
}

const contextTypes = {
    data: PropTypes.object
};
export default class BlogDetail extends React.Component {
    static fetchData(props, cb) {
        let options= {};
        if(props.location && props.location.pathname){
            options.id = props.location.pathname.split('/')[3];
        }
        API.getApi('BlogDetail' , options , false).then((res) =>{
            if(res.status === 302 && res.redirect){
                cb({
                    status : 302 ,
                    url : res.redirect
                });
            }
            if(res.status === 200 && res.data){
                cb(getData(res));
            }
            else{
                console.log("API ERROR AT ProjectListingpage");
                cb({error : true});
            }
		})
	}
    
    constructor(props , context){
        super(props , context);
        this.state = this.context.data || props;
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
        
        return(
            <div>
                <h2>{this.state.blog.title}</h2>
                {React.createElement('div', {
                    dangerouslySetInnerHTML: { __html: `${this.state.blog.long_description}` }
                })}
            </div>
        )
    }
}  

BlogDetail.contextTypes = contextTypes;
BlogDetail.defaultProps = defaultProps;
