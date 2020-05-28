import React , {useState} from 'react';
import global from '../../utils/globals';
import API from '../../utils/Api'

const Like_Unlike = (props)=>{
    let [like , setLike] = useState(props.like);
    let handleClick = () => {
        let remember_digest = global.checkUserLogin();
        if(remember_digest){
            let data = {
                product_id : props.items && props.items.product_id,
                liked : like ? 0 : 1
            }
            setLike(!like);
            API.POSTAPI('WishListPost' , data , false , remember_digest).then((res) =>{
                try{
                    if(res.status !== 200){
                        setLike(like);
                        alert("Unable to like something wrong");
                    }
                } catch(e) {
                    console.log("API ERROR AT WishList");
                    cb({error : true, errorResp : "Exception" });
                }
            })
        }
    }
    return (
        <i class={`fa ${like ? "fa-heart" : "fa-heart-o"}`} aria-hidden="true" onClick={handleClick}></i>
    )
    
}
export default Like_Unlike;