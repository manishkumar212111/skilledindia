import React from 'react';
import API from '../../utils/Api'
import detect from '../../utils/detect';
import globals from '../../utils/globals';

const interestedContent = [
    { title: "Select Service Type" , value : "none" },    
    { title: "Architect" , value : "Architect" },
    { title: "Interior designer" , value : "Interior designer" },
    { title: "Carpenter" , value:"Carpenter" },
    { title: "Paint" , value:"Paint" },
    { title: "False ceiling" , value:"False ceiling" },
]

const regexps = {
	email: /^[a-z0-9]+[\.a-z0-9+_-]+(\.[a-z0-9+_-]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|consulting|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
	alnum: /^[A-Za-z0-9]+$/,
	alnumwithspace: /^[A-Za-z0-9 ]+$/,
	alpha: /^[A-Za-z]+$/,
	alphawithspace: /^[ A-Za-z ]+$/,
	number: /^[0-9]+$/,
	mobile: /^(?![9]{10})(?:[6|7|8|9][0-9]{9})$/,
    fullnamewithspace:/^[a-zA-z]+\s[a-zA-z]+/,
};

const defaultProps = {
    openForm : false,
    showButton : true,
    showThanksScreen : false
}

export default class Leads extends React.Component {
    constructor(props){
        super(props);
        this.state = this._getInitialProps(props);
        this.handleChange = this.handleChange.bind(this);
        this.validateFields = this.validateFields.bind(this);
        this.validateField = this.validateField.bind(this);
        this.finalSubmit = this.finalSubmit.bind(this);
        this.closeCallBack = this.closeCallBack.bind(this);
    }
    _getInitialProps(props){
        
        var field = {
            fields : {
                name : '',
                mobile : '',
                interested_in : '',
                area : '',
                ref_PINID : '',
                location : ''
            },
            error : {
                name : {
                    status : true,
                    message : 'please enter correct name'
                },
                mobile : {
                    status : true,
                    message : 'please enter correct mobile'
                },
                interested_in : {
                    status : true,
                    message : ''
                },
                location : {
                    status : true,
                    message : 'please enter correct location'
                },
                area : {
                    status : true,
                    message : 'please enter correct area'
                },
                ref_PINID : {
                    status : true,
                    message : 'please enter correct ref_PINID'
                },

            }
        }
        
        return Object.assign({}, field, props)
    }
    componentDidMount(){
       if(globals.getCookie('name') || globals.getCookie('mobile')){
            let fields = this.state.fields;
            fields.name = globals.getCookie('name');
            fields.mobile = globals.getCookie('mobile');
            fields.location = globals.getCookie('location');

            this.setState({fields : fields, showButton : this.validateField()});

       }

    }
    closeCallBack() {
        if( typeof this.props.closeCallBack == 'function'){
            this.props.closeCallBack(false);
        }
    }
    handleChange(e , key){
        let fields = this.state.fields;
        let validationStatus = this.state.error;
		validationStatus[key].status = this.validateFields(key, e.target.value);

        fields[key] = e.target.value;
        
        this.setState({ fields : fields , error : validationStatus})
        let status = this.validateField();
        let showArea = this.state.showArea;
        if(key == 'interested_in'){
            showArea =true ;
        }
        this.setState({showButton : status , showArea : showArea })
    }

    validateField(){
        let validationArray = ['name', 'mobile' , 'location'];
		// let error = this.state.error;
		let status = true;
		for (let i in validationArray) {
			status = status && this.validateFields(validationArray[i],this.state.fields[validationArray[i]]);
        }
	    return status;
    }

    validateFields(key , value){
        switch(key){
           case 'name':
                return (regexps['alphawithspace'].test(value) && value.length > 2); 
            case 'mobile':
                return (regexps['mobile'].test(value) && value.length == 10); 
            case 'location':
                return (value.length > 0); 
            case 'interested_in' : 
                return true;
            case 'area' :
                return regexps['number'].test(value);
            case 'ref_PINID' : 
                return true;
        }
        return false;
    }

    finalSubmit(){
        if(!this.validateField()){
            return;
        }
        let options = {
            name : this.state.fields.name,
            mobile : this.state.fields.mobile,
            interested_in : this.state.fields.interested_in,
            source : detect.isMobile() ? 'wap' : 'web',
            ref_PINID : this.state.fields.ref_PINID,
            area : this.state.fields.area,
            location : this.state.fields.location
        }
        let self = this;
        // set cookie
        globals.setCookie('name' , this.state.fields.name);
        globals.setCookie('mobile' , this.state.fields.mobile);
        globals.setCookie('location' , this.state.fields.location);

        API.POSTAPI('LeadPostAPI' , options , false).then((res) => {
            if(res.status == 200){
                self.setState({showThanksScreen : true});
            } else{
                alert("something went wrong");
            }        
        })
    }

    render() {
        if(!this.props.openForm) return null;
        let getInterestedContent = () => {
            let h= [];
            interestedContent.map((item) => {
                h.push(<option value={item.value}>{item.title}</option>)
            })

            return h;
        }
        
        return (
            <div className="overlay">
                <div className= "popup">
                    <span onClick={() => this.closeCallBack()} class="close">&times;</span>
                    {!this.state.showThanksScreen ? <div className="content">                    
                        <h2>Let US Know Your Query</h2>
                        <div className="form-group">
                            {!this.state.error['name'].status && <span class="error">{this.state.error['name'].message}</span>}
                            <input type="text" className="form-control" name="name" id="name" value={this.state.fields.name} placeholder="Enter Name" onChange={(e) => this.handleChange(e , 'name')}/>
                        </div>

                        <div className="form-group">
                            {!this.state.error['mobile'].status && <span class="error">{this.state.error['mobile'].message}</span>}                    
                            <input type="tel" className="form-control" name="mobile" id="mobile" placeholder="Mobile No" value={this.state.fields.mobile} onChange={(e) => this.handleChange(e , 'mobile')} />
                        </div>

                        <div className="form-group">
                            <select name="interested_in" className="form-control"  onChange={(e) => this.handleChange(e , 'interested_in')}>
                                {getInterestedContent()}
                            </select>
                            <span class="error"></span>
                        </div>
                        
                        {this.state.showArea && <div className="form-group">
                            {!this.state.error['area'].status && <span class="error">{this.state.error['area'].message}</span>}                    
                            <input type="number" className="form-control" name="area" id="area" placeholder="Area in sq ft if known" value={this.state.fields.area} onChange={(e) => this.handleChange(e , 'area')} />
                        </div>}
                        <div className="form-group">
                            {!this.state.error['location'].status && <span class="error">{this.state.error['location'].message}</span>}                    
                            <input type="text" className="form-control" name="location" id="location" placeholder="Enter Location" value={this.state.fields.location} onChange={(e) => this.handleChange(e , 'location')} />
                        </div>
                        <div className="form-group">
                            {!this.state.error['ref_PINID'].status && <span class="error">{this.state.error['ref_PINID'].message}</span>}                    
                            <input type="text" className="form-control" name="ref_PINID" id="ref_PINID" placeholder="Reference PINID if any" value={this.state.fields.ref_PINID} onChange={(e) => this.handleChange(e , 'ref_PINID')} />
                        </div>

                        <div className="">
                            <button className={`${!this.state.showButton ? 'btn_disabled' : ''} btn btn-danger form-control`} onClick={() => this.finalSubmit()}>Submit</button>
                        </div>
                    </div> : 
                    <div className="content">
                        Thanks for query , our team will contact you within 24 hours    
                    </div>  
                    }
                </div>
            </div>
        )
    }
}

Leads.defaultProps = defaultProps;