import React from "react";
import { useNavigate } from "react-router-dom";


export default React.memo(function Card({list, taxes}) {
  // function Card({list, taxes}) {
  let navigate = useNavigate();
  return (

      <a className="list-link" onClick={() => navigate("/show",{state:{listId : list._id}})}>
        <div className="card col list-card">
          <img className="card-img-top" src={list.image ? list.image.url : list.image} alt="Card image cap" style={{height: '19rem',}} />
          <div className="card-img-overlay"></div>
          <div className="card-body">
              <p className="card-text"> <b> {list.title} </b> <br />
              &#8377; {list.price.toLocaleString("en-IN")} <span className="taxes" style={taxes ? { visibility: "visible" } : { visibility: "hidden" }}  > +18% Gst</span>
          </p>
          </div>
        </div>
      </a>
  )
});