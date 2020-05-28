import React , {Fragment} from 'react';
import LazyImage from '../elements/LazyImage';
import CLink from '../elements/CLink'
import Like_Unlike from '../elements/Like_Unlike';
import Leads from '../../components/widgets/Leads';

const defaultProps = {
    viewALlTitle : "View All",
    description : "This is test desc",
    headerTitle : "New projects",
    imgHeight : 'auto',
    innerClass : "",
    showLeadButton : false,
    likedAll : false
}
export default class Card extends React.Component{
    constructor(props){
        super(props);
        this.state = props;
        this.handleLeadClick = this.handleLeadClick.bind(this);
    }

    handleLeadClick(flag) {
        this.setState({
            showLeadForm : flag
        })
    }

    render(){
        const props = this.props;
        let items = props.items;
        return(<Fragment>
                    <div class="col-md-3 p-0  ">
                        <div class="m-2 project-box set_card_layout ">
                            <CLink href={items.url} default={true}>
                            <div class={`inner-img ${props.innerClass}`}>
                              
                                <LazyImage src={items.coverImage} alt={items.title} height={props.imgHeight}/>
                                {/* changes in card for design */}
                                
                                {/* changes ends here */}
                            </div>
                            <h5>{items.short_description}</h5></CLink>
                            {items.price && <span class="price-box"><i class="fa fa-inr" aria-hidden="true"></i> {items.price}</span>}
                            {this.state.showLeadButton && <div className="lead-btn-box">
                                    <button type="button" onClick={(e) => this.handleLeadClick(true)} className="lead_btn" >Know More</button>
                                    <Like_Unlike items= {{ product_id : items.id}} like={items.liked} />
                            </div>}
                            {this.state.showLeadForm && <Leads openForm={true} closeCallBack={this.handleLeadClick} />}

                        </div>

                    </div>
                
            </Fragment>
        )
    }    
};

Card.defaultProps = defaultProps;