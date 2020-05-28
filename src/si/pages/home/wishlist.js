import React from 'react';
import PropTypes from 'prop-types';
import global from '../../utils/globals';
import API from '../../utils/Api';
import Simmer from '../../components/elements/Simmer';
import Card from '../../components/widgets/Card';

const defaultProps = {
	seo  : {title : "WishList Page" , pageDescription : "This is WishList Page"},
    description : "",
    items : {},
    chunkJs : 'wishlist',
    pagination :{}
}

var getAPIResponse = (props ,cb , remember_digest) => {
	API.getApi('WishListGet' , {remember_digest : remember_digest} , false).then((res) =>{
		try{
			if(res.status === 200 && res.data){
			    cb(getData(res));
			}
			else{
				console.log("API ERROR AT WishList");
				cb({error : true, errorResp : "Invalid Response" });
			}
		} catch(e) {
			console.log("API ERROR AT WishList");
			cb({error : true, errorResp : "Exception" });
		}
	})
}
var getData = (res) => {
	let o = {
		seo : res.data.seo ? res.data.seo : defaultProps.seo,
		items : res.data.items ? res.data.items : defaultProps.items,
		shimmer : false,
		chunkJs : 'wishlist'
	};
	return o;
}

const contextTypes = {
    data: PropTypes.object
};

export default class WishList extends React.Component {
    static fetchData(props, cb) {
        let remember_digest = false;
        let userData = props.serverCookie && global.getServerSideCookie(props.serverCookie , 'userData');
        userData = userData && global.stringToJson(userData);
        if(userData && JSON.parse(userData) && JSON.parse(userData).remember_digest){
            remember_digest = JSON.parse(userData).remember_digest;
        }
        if(remember_digest){
            API.getApi('WishListGet' , { remember_digest : remember_digest } , false ).then((res) =>{
                try {
                    if(res.status === 200 && res.data){
                        cb(getData(res));
                    }
                 
                    else {
                        console.log("API ERROR AT WishList");
                        cb({error : true});
                    }
                } catch (e){
                    console.log("API ERROR AT WishList");
                    cb({error : true});
            
                }
            })
        } else {
            cb(defaultProps);
        }
	}
    
    constructor(props , context){
        super(props , context);
        this.state = this.context.data || defaultProps;
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
        let remember_digest = global.checkUserLogin();
        if(remember_digest){
            getAPIResponse(props , (res) => {
                self.setState(res);
            }, remember_digest)
        }
	}

    render(){
        
        if(this.state.shimmer){
			return(<Simmer />)
        }
        
        const getContentList = (items) =>{
			let h = [];
			items && items.map((item) => {
                item.liked = true;
                h.push(<Card 
					items = {item}
                    showLeadButton = {true}
                    likedAll = {true}
                />)
			})
			return h;
        }
        return(
            <div className="content-box">
				<div class="header-inner">
					<h4>Your Choices</h4>
				</div>
				<div className="row">        
                    {this.state.items && this.state.items.length > 0 ? getContentList(this.state.items) : 
                        "No Data Available"
                    }
                </div>
            </div>
        )
    }
}  

WishList.contextTypes = contextTypes;
WishList.defaultProps = defaultProps;
