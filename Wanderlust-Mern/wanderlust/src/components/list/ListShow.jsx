// import { Form, useLocation, useNavigate, useSubmit } from "react-router-dom"
import { Alert, Fade } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"


export default function ListShow(){
    let { state } = useLocation();
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        "review[rating]" : "",
        "review[comment]" : "",
    });

      const handleInputChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted:", formData["review[comment]"]);
    };

    // const [alertVisibility, setAlertVisibility] = useState(state ? state.alert : false);
    const [alertVisibility, setAlertVisibility] = useState(false);
    useEffect(() => {
        setTimeout(() => {
          setAlertVisibility(false);
        }, 3000);
      });

    return (
        <>
        <Fade in={alertVisibility} timeout={{ exit: 1000 }}>
            <Alert severity="success" onClose={() => {setAlertVisibility(false);}}>
                This Alert displays the default close icon.
            </Alert>
        </Fade>
            <div className="row">
                <div className="col-8 offset-3">
                    <h1> {state.list.title} </h1>
                </div>
                <div className="card col-6 offset-3 list-card">
                    <img className="card-img-top show-img" src={state.list.image.url} alt="Card image cap" />
                    <div className="card-body">
                    <p className="card-text">
                        Owner By : {state.list.owner.username}
                    </p>

                    <p className="card-text"> 
                        {state.list.description} <br />
                    </p>
                    <p className="card-text">
                        {state.list.location} <br />
        
                    </p>
                    <p className="card-text">
                        {state.list.country} <br />
                    </p>
                    <p className="card-text">
                    &#8377; {state.list.price.toLocaleString("en-IN")}
                    </p>
        
                    </div>
                </div>
        
                
            </div>
 
            <div className="col-2 offset-3 d-flex mb-3">
                    {/* <button className="btn btn-danger" onClick={() => navigate("/edit", {state : {list :state.list}})  }> Edit </button> */}
                    <button className="btn btn-danger" onClick={() => navigate("/edit", {state : {list :state.list}})  }> Edit </button>
                
                    <button className="btn btn-dark offset-2" > Delete </button>
            </div>
         
            
        
            <div  className="col-8 offset-3">
                <hr />
                <h4> Leave a Review </h4>
                {/* <Form action={"/list/"+state.list._id+"/review"} className="needs-validation" method="post" onChange={(event) => {submit(event.currentTarget);} }> */}
                <form onSubmit={handleSubmit} /* action={"/list/"+state.list._id+"/review"} */ className="needs-validation" method="post">
                    <div className="foem-group">
                            
                        <fieldset className="starability-slot">
                            <legend>Rating</legend>
                            <input type="radio" id="no-rate" className="input-no-rate" name="review[rating]" onChange={handleInputChange} value="1" checked aria-label="No rating." />
                            <input type="radio" id="first-rate1" name="review[rating]" onChange={handleInputChange} value="1" />
                            <label htmlFor="first-rate1" title="Terrible">1 star</label>
                            <input type="radio" id="first-rate2" name="review[rating]" onChange={handleInputChange} value="2" />
                            <label htmlFor="first-rate2" title="Not good">2 stars</label>
                            <input type="radio" id="first-rate3" name="review[rating]" onChange={handleInputChange} value="3" />
                            <label htmlFor="first-rate3" title="Average">3 stars</label>
                            <input type="radio" id="first-rate4" name="review[rating]" onChange={handleInputChange} value="4" />
                            <label htmlFor="first-rate4" title="Very good">4 stars</label>
                            <input type="radio" id="first-rate5" name="review[rating]" onChange={handleInputChange} value="5" />
                            <label htmlFor="first-rate5" title="Amazing">5 stars</label>
                        </fieldset>
                    </div>    
                    <div className="foem-group">
                        <label htmlFor="comment" className="form-label" >Comment</label>
                            <textarea name="review[comment]" className="form-control" id="comment" cols="30" rows="10" onChange={handleInputChange} value={formData["review[comment]"]} required></textarea>
                            <div className="invalid-feedback"> Please Enter Comment. </div>
                            <br />
                    </div>
                    
                    <button type="submit" className="form-control btn btn-danger">Save</button>
                    <br />
                    <br />
                </form>
                
                {/* {state.list.reviews != "" && state.list.reviews != null? <Review /> : "" } */}
            </div>
        </>

    )
}