import React , {Fragment} from 'react';
import Card from './Card';
import CLink from '../elements/CLink';
// import Card_For_Leads from './Cards_For_Leads';

const defaultProps = {
    outerClass : "",
    innerclass : '',
    showLikeUnlike : false
}

export default class CardList extends React.Component {
    constructor(props){
        super(props);
        this.state = props;
           
    }
    
    render(){
        let self = this;
        let props = this.props;
        if(typeof props.items === 'undefined') return null;
        const getContentList = (items) => {
            let h = [];
			items.items && items.items.map((item) => {
				h.push(<Card 
					items = {item}
                    innerClass = "setimagewidth"
                    // like_unlike={props.showLikeUnlike}
                    showLeadButton = {props.showLeadButton}
				/>)
			})
			return h;
        }
        return(
            <Fragment>
                {props.items && 
                <div className={props.outerClass}>
                    <div class="header-inner">
                        <h4>{props.title} <CLink default= {true} href={props.viewAllLink} className="theme-btn">View All</CLink></h4>
                    </div>
                    <div className="row">
                        <div className="inonerow">	{getContentList({items : this.props.items})} </div>
                    </div>
                </div>
                }
            </Fragment>
        );
    }
}

CardList.defaultProps = defaultProps;