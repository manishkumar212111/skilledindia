import React from 'react';
import API from '../../utils/Api'
import detect from '../../utils/detect';

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
export default class ContactForm extends React.Component {
    constructor(props){
        super(props);
        this.state = this._getInitialProps(props);
        this.handleChange = this.handleChange.bind(this);
        this.validateFields = this.validateFields.bind(this);
        this.validateField = this.validateField.bind(this);
        this.finalSubmit = this.finalSubmit.bind(this);
    }
    _getInitialProps(props){
        
        var field = {
            fields : {
                name : '',
                mobile : '',
                email : '',
                comments : ''
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
                email : {
                    status : true,
                    message : 'please enter correct email'
                },
                comments : {
                    status : true,
                    message : 'please enter correct comments'
                }
            }
        }
        
        return Object.assign({}, field, props)
    }
    
    handleChange(e , key){
        let fields = this.state.fields;
        let validationStatus = this.state.error;
		validationStatus[key].status = this.validateFields(key, e.target.value);

        fields[key] = e.target.value;
        
        this.setState({ fields : fields , error : validationStatus})
        let status = this.validateField();
    
        this.setState({showButton : status})
    }

    validateField(){
        let validationArray = ['name', 'mobile' , 'email'];
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
            case 'email':
                return (regexps['email'].test(value)); 
            case 'comments' : 
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
            source : detect.isMobile() ? 'wap' : 'web',
            email : this.state.fields.email,
            comments : this.state.fields.comments,
        }
        let self = this;
        API.POSTAPI('ContactAPI' , options , false).then((res) => {
            if(res.status == 200){
                alert('Your query has been submitted , we will revert back soon')
            } else{
                alert("something went wrong");
            }        
        })
    }

    render(){
        return (
            <div className="col-sm" >
                <h3 className="font-weight-bold">Write to us</h3>
                <span>Send your query to us </span>
                <div className="form-group mt-5">
                    {!this.state.error['name'].status && <span class="error">{this.state.error['name'].message}</span>}                
                    <input type="text" className="form-control" id="name" placeholder="Enter Name" onChange={(e) => this.handleChange(e , 'name')}/>
                </div>
                <div class="form-group my-4" >
                    {!this.state.error['mobile'].status && <span class="error">{this.state.error['mobile'].message}</span>}                
                    <input type="tel" className="form-control" id="number" placeholder="Enter Number" onChange={(e) => this.handleChange(e , 'mobile')}/>
                </div>
                <div class="form-group my-4" >
                    {!this.state.error['email'].status && <span class="error">{this.state.error['email'].message}</span>}
                    <input type="email" className="form-control" id="email" placeholder="Enter Email" onChange={(e) => this.handleChange(e , 'email')}/>
                </div>
                <div>
                    {!this.state.error['comments'].status && <span class="error">{this.state.error['comments'].message}</span>}                    
                    <textarea className="form-control" rows="5" id="comment" placeholder="Enter Commment" onChange={(e) => this.handleChange(e , 'comments')}></textarea>
                </div>
                    <button type="button" className={`${!this.state.showButton ? 'btn_disabled' : ''} btn btn-danger btn-block my-4`} onClick={() => this.finalSubmit()}>Submit</button>
            </div>
        )
    }
}