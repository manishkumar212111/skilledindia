import React from "react";
const cardList = [
    {icon : "fa fa-phone" , title:"Call-us" , description:<div >+91 1234567891<div className="font-weight-light">Mon to Sat 9:30 AM to 6 PM</div></div>},
    {icon : "fa fa-envelope" , title:"email" , description:<div>abc@pintaki.com</div>},
    {icon : "fa fa-map-marker" , title:"Address" , description:<div>12/335,jagatpura,jaipur,rajasthan -123456</div>}
]
const ContactCard = ()=>{

  const simplecard = (icon , title , subtitle)=>{
    let card_view = [];
      cardList.map((val)=>card_view.push( 
         <div class="card mx-auto my-3 ">
           <div class="card-body">
               <div className="row">
                 <div className="col-2">
                   <i className={`${val.icon}`} ></i>
                 </div>
                 <div className="col-10">
                   <div class="card-text font-weight-light">{val.title}</div>
                   <div class="card-text">{val.description}</div>
                 </div>
                 </div>      
            </div>
          </div>
          )        
    )
  return card_view;
  }
    return(
      <div className="col-sm" >
        {simplecard()}
      </div>
    )
}
export default ContactCard;