import React, { Component } from 'react';
import configs from '../../configs/configs'; 
import API from '../../utils/Api';
import global from '../../utils/globals';

const defaultProps = {
    showButton : true
}

class GoogleLogin extends Component {
    constructor(props){
        super(props);
        this.state = props;
        this.prepareLoginButton = this.prepareLoginButton.bind(this);
        this.googleSDK = this.googleSDK.bind(this);
        this.closeCallBack = this.closeCallBack.bind(this);
    }

    componentDidMount() {
        let data = localStorage.getItem('userData');
        if(data){
            this.setState({ showButton : false })
        } else {
            this.googleSDK();
        }
    }
    closeCallBack() {
        this.setState({
            showButton : false
        })
    }

    prepareLoginButton(self){
 
    this.auth2.attachClickHandler(this.refs.googleLoginBtn, {},
        (googleUser) => {

        self.setState({loader : true});    
        API.POSTAPI("GoogleAuthAPI" , {id_token : googleUser.getAuthResponse().id_token} , false).then((res) =>{
            if(res.status && res.status == 200){
                localStorage.setItem("userData" , JSON.stringify(res.data));
                delete res.data.profile_image;
                global.setCookie('userData' , JSON.stringify(res.data));
                
                self.setState({
                    showButton : false,
                    message : "logged in success",
                    loader : false
                })                 
            } else {
                self.setState({
                    message : "try again",
                    loader: false
                })
            }
        })
        }, (error) => {
            self.setState({
                message : "try again",
                loader:false
            }) 
            console.error(JSON.stringify(error, undefined, 2));
        });
    }
 
    googleSDK(){
        let self = this;
        window['googleSDKLoaded'] = () => {
          window['gapi'].load('auth2', () => {
            self.auth2 = window['gapi'].auth2.init({
              client_id: configs.google_client_id,
              cookiepolicy: 'single_host_origin',
              scope: 'profile email'
            });
            self.prepareLoginButton(self);
          });
        }
     
        (function(d, s, id){
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'google-jssdk'));
     
    }
   
    render() {
        if(!this.state.showButton)
            return "";
        return (
            <div className="overlay login-screen">  
                <div className="popup">
                    {/* <h2 className="text-left"></h2> */}
                    <span onClick={() => this.closeCallBack()} class="close">&times;</span>                    
                    {!this.state.loader ? <div className="content">
                        <div className="col-md-8 m-auto ">
                            <button className="loginBtn loginBtn--google" ref="googleLoginBtn">
                                Login with Google
                            </button>
                            {this.state.message && <span className="error">{this.state.message}</span>}
                        </div>
                    </div> : 'Logging in ...'}
                </div>
            </div>
        );
    }
}
 
GoogleLogin.defaultProps = defaultProps;
export default GoogleLogin;
