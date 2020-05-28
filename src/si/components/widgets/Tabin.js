import React , {Fragment} from 'react';

const defaultProps = {
    UlClassName : "nav nav-pills",
    liClassName : "nav-item",
    spanClassName : "",
    index : 0
}

export default class Tabin extends React.Component {
    constructor(props){
        super(props);
        this.state = props;
        this.handleTabinClick = this.handleTabinClick.bind(this);    
    }
    
    handleTabinClick(e , index){
        if(typeof this.props.handleTabinClick == 'function'){
            this.props.handleTabinClick(index , e.target);
        }

    }

    render(){
        let self = this;
        let props = this.props;
        if(typeof props.items === 'undefined') return null;
        const getListItem = (items) => {
            let h = [];
                items.map((item , index) => {
                    h.push(<li className={props.liClassName} key={index} onClick = {(e) => {this.handleTabinClick(e , index)}}>
                        <span className={`${item.class} ${self.props.index == index ? 'active' : ''}`}>{item.title}</span>
                    </li>)
                })
            
            return h;
        }
        return(
            <Fragment>
                {props.items && <ul className={props.UlClassName}>
                    {getListItem(props.items)}
                </ul>}
            </Fragment>
        );
    }
}

Tabin.defaultProps = defaultProps;