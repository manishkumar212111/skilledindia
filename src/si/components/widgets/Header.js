import React, {Fragment}  from 'react';
import CLink from '../elements/CLink';
import {menuMobile ,menuDesktop} from '../../../data/menu'
import LazyImage from '../elements/LazyImage';
// import detect from '../../utils/detect';
import Leads from '../../components/widgets/Leads';
import GoogleLogin from '../../components/widgets/GoogleLogin';

export default class MobiHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = { expandMenu : false , openForm : false}
        this.handleNavigationClick = this.handleNavigationClick.bind(this)
        this.handleFormOpen = this.handleFormOpen.bind(this);
        this.closeCallBack = this.closeCallBack.bind(this);
    }
    componentDidMount(){
        if(typeof window != 'undefined'){
            let location = window.location && window.location.hash;
            if(location && location.indexOf('#login') > -1){
                this.setState({ 
                    showLogin : true
                })
            }            
        }
    }
    handleFormOpen() {
        this.setState({
            openForm : true
        })        
    }

    closeCallBack(){
        this.setState({
            openForm : false
        })
    }

    handleNavigationClick(){
        
        this.setState({
            expandMenu : !this.state.expandMenu
        });
    }

    render(){ 
        const mobileMenus = (items) =>{
            let h = [];
            {items && items.map((item) => {
                h.push(<li className="nav-item">
                    <CLink className={item.class} default={true} href={item.link}>{item.title}</CLink>
                </li>)
            })}
            return h;
        }
        
        return(
                <header>
                    <nav className="navbar navbar-dark bg-primary">
                        <span className="left_side" onClick={() => this.handleFormOpen()}>
                            <i className="fa fa-paper-plane-o" ></i>
                        </span>
            
                        <CLink className="navbar-brand" default={true} href="/"> <LazyImage src="/images/logo.png" /></CLink>
                        <span className="right_side"><a title="call" href="tel:+919672421830"><i class="fa fa-phone" aria-hidden="true"></i></a></span>
                        {this.state.expandMenu && <div className=" navbar-collapse">
                            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                                {mobileMenus(menuMobile)}
                            </ul>
            
                        </div>}
                    </nav>
                    {this.state.showLogin && <GoogleLogin />}
                    {this.state.openForm && <Leads openForm={true} closeCallBack={this.closeCallBack} />}
            </header>

        );}
}

export class DesktopHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.handleFormOpen = this.handleFormOpen.bind(this);
        this.closeCallBack = this.closeCallBack.bind(this);

    }
    componentDidMount(){
        if(typeof window != 'undefined'){
            let location = window.location && window.location.hash;
            if(location && location.indexOf('#login') > -1){
                this.setState({ 
                    showLogin : true
                })
            }            
        }
    }

    handleFormOpen() {
        this.setState({
            openForm : true
        })        
    }

    closeCallBack(){
        this.setState({
            openForm : false
        })
    }
    
    render(){ 
        const desktopMenus = (items) =>{
            let h = [];
            {items && items.map((item) => {
                h.push(<li className="nav-item">
                    <CLink className={item.class} default={item.default} href={item.link}>{item.title}</CLink>
                </li>)
            })}
            return h;
        }
        
        return(

            <header>
                <div className="container">


                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <CLink className="navbar-brand" href="/" default={true}> <img src="images/logo.png" /></CLink>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>


                        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                                {desktopMenus(menuDesktop)}
                            </ul>

                        </div>
                        <div className="searchbar">
                            <input type="text" className="form-control" placeholder="Search" />
                            <i className="fa fa-search" aria-hidden="true"></i>

                        </div>
                    </nav>
                </div>
                {this.state.showLogin && <GoogleLogin />}
                {this.state.openForm && <Leads openForm={true} closeCallBack={this.closeCallBack} />}
            
            </header>

        );}
}
