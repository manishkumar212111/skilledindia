import React , {Fragment} from 'react';
import CLink from '../elements/CLink'
import {FooterMenuDesktop , FooterMenuMobile} from '../../../data/menu'


export default class Footer extends React.Component {
    constructor(props){
        super(props);
    }


    render(){
        const footerMenus = (items) =>{
            let h = [];
            {items && items.map((item) => {
                h.push(
                    <CLink default={item.default} href={item.link}>{item.title}</CLink>
                )
            })}
            return h;
        }
        return(
            <footer>
                <div className="container">
                    <div className="row">

                        <div className="col-md-7">
                            <div className="addthis_inline_follow_toolbox">
                                <CLink href="#"><i className="fa  fa-facebook-official"></i></CLink>
                                <CLink href="#"><i className="fa  fa-linkedin-square"></i></CLink>
                                <CLink href="#"><i className="fa fa-twitter-square"></i></CLink></div>


                        </div>

                        <div className="col-md-5">
                            <div className="footer-link">
                                {footerMenus(FooterMenuDesktop)}
                            </div>


                            <div className="copy-right">
                                © 2019 All rights reserved.
                            </div>

                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export class MobiFooter extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        // className={`${item.class} ${self.props.index == index ? 'active' : ''}`}
        const getListItem = (items) => {
            let h = [];
                items.map((item , index) => {
                    h.push(<li className="nav-item" key={index}>
                        <CLink default={true} className={`${item.class} ${this.props.currentRoutes === item.link ? 'active' : ''}`} href={item.link}>{item.title}</CLink>
                    </li>)
                })
            
            return h;
        }
        return(
            <Fragment>
                {FooterMenuMobile && <ul className="nav nav-pills">
                    {getListItem(FooterMenuMobile)}
                </ul>}
            </Fragment>
        );
    }
}