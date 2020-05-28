import React from 'react';
import ImageKit from 'imagekit-javascript';
// var imagekit;

const defaultProps = {
    images : [],
    previewImgSrc : [],
    finalImageObj : []
}
export default class CreatePost extends React.Component{

    constructor(props){
        super(props);
        this.state = props;
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.upload = this.upload.bind(this);

    }

    upload(file , fileName , cb) {
        return new Promise( (resolve, reject) => {
        var imagekit = new ImageKit({
            publicKey : "public_V4ldmo1ufrBCmsx1XF2RLjKUnCU=",
            urlEndpoint : "https://ik.imagekit.io/pintaki/posts",
            authenticationEndpoint : "http://api.pintaki.in/auth",
        });
        imagekit.upload({
            file : file,
            fileName : fileName,
            tags : ["tag1"]
        }, function(err, result) {
                if(err){
                    reject(err)
                } else {
                    resolve(result);
                }
            });
            // cb(err, result);
        });
    }

    handleSubmit(){
        let self = this;
        var state = this.state;
        if(this.state.images && this.state.images.length > 0){
            this.state.images.forEach((element ,index) => {
                console.log("uploading" + index)
                this.upload(element , element.name+Math.random(4)+index+".jpg").then(result => {
                    state.previewImgSrc[index].status = "success" 
                    state.finalImageObj.push({
                        url : result.url,
                    })
                    self.setState(state);
                }, function(error){
                    state.previewImgSrc[index].status = "fail" 
                    self.setState(state);

                });
            });
            
        }
    }

    handleImageUpload(e){
        e.preventDefault();
        let self = this;
        const filesList = e.target.files;
        if(filesList && filesList.length > 0){
            let image = [...this.state.images, ...filesList];

            let arr = [...this.state.previewImgSrc];
            for (let i = 0; i < filesList.length; i++) {
            const file = filesList[i];

            const reader = new FileReader();
            reader.onload = upload => {
                arr.push({code : upload.target.result , status : "pending"});
                
                self.setState({
                    images : image,
                    previewImgSrc: arr
                });
            };
            }
        }

    }

    render(){
        const getPreview = (items) =>{
            if(items && items.length == 0) return;
            let h = [];
            items.map((element , index) => {    
                h.push(
                    <li key={index}><img src={element.code} width="50" height="50">
                        </img>{element.status == 'success' ? "success" : element.status == 'fail' ? 'fail' : ""}
                    </li>
                )
            })
            return h;
        }

        return(
            <div id="dropZone">
                {this.state.previewImgSrc && this.state.previewImgSrc.length > 0 && getPreview(this.state.previewImgSrc)}
                <input type="file" name="images" multiple onChange={(e) => this.handleImageUpload(e)}/>
                <button type="button" onClick={() => this.handleSubmit()}>Submit</button>
            </div>
        )
    }
}

CreatePost.defaultProps = defaultProps;
