import { Alert, Fade } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function AddList(){

    const [formData, setFormData] = useState({
     title: "",
     description : "",
     image : "",
     price : "",
     location : "",
     country : "",
 });
 
//  let error = "";
 const [alertVisibility, setAlertVisibility] = useState(false);
 const [error, setError] = useState();
 
 const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    const newValue = type === "file" ? event.target.files[0] : value;
    setFormData({...formData, [name]: newValue });
};

   const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
    });

    try {
        const response = await axios.post("http://localhost:8000/list/add", formDataToSend);
        if(response.data.success){
            setFormData("");
        }else{
            setAlertVisibility(true);
            setError(response.data.error);
        }
    } catch (error) {
        console.error("Axios error:", error);
    }
};

    return(
        <>
        <Fade in={alertVisibility}>
            <Alert severity="error" onClose={() => {setAlertVisibility(false);}}>
                {error}
            </Alert>
        </Fade>
             <form onSubmit={handleSubmit}  className="needs-validation" method="post" encType="multipart/form-data">
            {/* <form action="http://localhost:8000/list/add" className="needs-validation" method="post" encType="multipart/form-data"> */}
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1>Create List</h1>
                        <div className="mb-3">
                        <label htmlFor="title" className="form-label" >Title</label>
                            <input type="text" name="title" onChange={handleInputChange} placeholder="title" className="form-control" />
                            <div className="invalid-feedback">
                                Please choose a Title.
                            </div>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea name="description" onChange={handleInputChange} className="form-control" placeholder="description" ></textarea>
                            <div className="invalid-feedback">
                                Please choose a Description.
                            </div>
                        </div>
                        
                        <div className="mb-3">
                        <label htmlFor="image" className="form-label">Image</label>
                        <input type="file" name="image" onChange={handleInputChange} className="form-control" placeholder="image" />
                            <div className="invalid-feedback">
                                Please choose a Description.
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-4">
                                <label htmlFor="price" className="form-label">Price</label>
                                    <input type="text" name="price" onChange={handleInputChange} placeholder="price" className="form-control" />
                                    <div className="invalid-feedback">
                                        Please choose a Price.
                                    </div>
                            </div>
                            <div className="col-md-8">
                            <label htmlFor="location" className="form-label">Location</label>
                                <input type="text" name="location" onChange={handleInputChange} placeholder="location" className="form-control" />
                                <div className="invalid-feedback">
                                    Please choose a Location.
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="country" className="form-label">Country</label>
                            <input type="text" name="country" onChange={handleInputChange} placeholder="country" className="form-control" />
                            <div className="invalid-feedback">
                                Please choose a Country.
                            </div>
                        </div>
                
                        <button className="form-control btn btn-danger">Save</button>
                    </div>
                </div>
            </form>
        </>
    )
}
