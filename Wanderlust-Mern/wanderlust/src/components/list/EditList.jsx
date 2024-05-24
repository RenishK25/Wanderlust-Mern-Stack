import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";


function EditList() {
    let navigate = useNavigate();

   let { state } = useLocation();
   const [formData, setFormData] = useState({
    title : "",
    description : "",
    // image : "",
    price : "",
    location : "",
    country : "",
   });

   useEffect(() => {
    async function loadCard(){
        let fetchLists = await fetch("http://localhost:8000/list/"+state.list._id);            
        let data = await fetchLists.json();
        setFormData({
            title : data.list.title,
            description : data.list.description,
            image : data.list.image,
            price : data.list.price,
            location : data.list.location,
            country : data.list.country,
        });
    };
    loadCard();
}, []);

const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    const newValue = type === "file" ? event.target.files[0] : value;
    setFormData({
        ...formData,
        [name]: newValue
    });
};

  const handleSubmit = async (event) => {
   event.preventDefault();
   const formDataToSend = new FormData();
   Object.keys(formData).forEach(key => {
    console.log(formData[key]);
       formDataToSend.append(key, formData[key]);
   });
   try {
       const response = await axios.put("http://localhost:8000/list/"+state.list._id+"/edit", formDataToSend);
       if(response.data.success){
        if(response.data.list){
            // navigate("/show", {state : {alert : true}});
            setFormData({
                title : response.data.list.title,
                description : response.data.list.description,
                image : response.data.list.image,
                price : response.data.list.price,
                location : response.data.list.location,
                country : response.data.list.country
            });
        }
       }
   } catch (error) {
       console.error("Axios error:", error);
   }
};

    return (
      <Container>
        <form onSubmit={handleSubmit}  className="needs-validation" method="post" encType="multipart/form-data">
        <div className="row">
            <div className="col-8 offset-2">
                <h1 className="title" >Edit List</h1>
                <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" name="title" onChange={handleInputChange} placeholder="title" value={formData.title} className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea name="description" rows={5} onChange={handleInputChange} className="form-control" placeholder="description" value={formData.description}>
                    </textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <br />
                    <a target="_blank" href={formData.image ? formData.image.url : ""}>
                        <img src={formData.image ? formData.image.url : ""} style={{height: "200px",width: "350px"}} />
                        <br />
                    </a>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Uplode Image</label>
                    <input type="file" name="image" onChange={handleInputChange} id="image" className="form-control" placeholder="image" />
                        <div className="invalid-feedback">
                            Please choose a Description.
                        </div>
                    </div>

                <div className="row mb-3">
                    <div className="col-md-4">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="text" name="price" onChange={handleInputChange} placeholder="price" value={formData.price} className="form-control" />
                    </div>
                    <div className="col-md-8">
                        <label htmlFor="location" className="form-label">Location</label>
                        <input type="text" name="location" onChange={handleInputChange} placeholder="location" value={formData.location} className="form-control" />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input type="text" name="country" onChange={handleInputChange} placeholder="country" value={formData.country} className="form-control" />
                </div>
        
                <button className="form-control btn btn-danger">Save</button>
                <br />
                <br />
            </div>
        </div>
     </form>
      </Container>
    )
  }

  const Container = styled.div`
  .title{
    color:red;
  }
`;

  export default EditList