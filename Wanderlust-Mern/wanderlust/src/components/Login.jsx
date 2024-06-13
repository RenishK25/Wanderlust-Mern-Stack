import { Alert, Fade } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


export default function Login(){

    const [formData, setFormData] = useState({username: "", password: "" });
    const [alertVisibility, setAlertVisibility] = useState(false);
    const [error, setError] = useState();
    let navigate = useNavigate();

      const handleInputChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/login", formData);
            console.log(response.data.accessToken, response.data.refreshToken);
            if(response.data.status ===  "success"){
                // localStorage.setItem('user', JSON.stringify(response.data.user, {accessToken : response.data.accessToken}, {refreshToken :response.data.refreshToken}));
                localStorage.setItem('user', JSON.stringify({user: response.data.user, accessToken: response.data.accessToken, refreshToken: response.data.refreshToken }));
                navigate('/');                
            }else{
                setAlertVisibility(true);
                setError(response.data.error);
            }
        } catch (error) {
            console.error("Axios error:", error);
        }
    };

      return (
        <Container>
            {alertVisibility && (
            <Fade in={alertVisibility}>
                <Alert severity="error" onClose={() => {setAlertVisibility(false);}}>
                    {error}
                </Alert>
            </Fade>
            ) }
            <div className="main">
            
                <h1 className="title"><i className="fa-solid fa-compass icon"></i> Wanderlust</h1>
                <hr />

                <form onSubmit={handleSubmit} method="post" className="needs-validation">
                {/* <label htmlFor="email">
                        Email:
                    </label>
                    <input type="email" className="form-control" id="email" name="email" onChange={handleInputChange} placeholder="Enter your Email"/>
                    <div className="invalid-feedback">
                        Please Enter Email.
                    </div> */}
                    <label htmlFor="username"> Username: </label>
                    <input type="text" className="form-control" id="username" name="username" onChange={handleInputChange} placeholder="Enter your Username" />
                    <div className="invalid-feedback">
                        Please Enter Username.
                    </div>
                    <label htmlFor="password">
                        Password:
                    </label>
                    <input type="password" className="form-control" id="password" name="password" onChange={handleInputChange} placeholder="Enter your Password"/>
                    <div className="invalid-feedback">
                        Please Enter Password.
                    </div>

                    <div className="wrap">
                        <button className="submitButton" type="submit">Submit</button>
                    </div>
                </form>

                <p>Not registered?  &nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="/register" >
                        Create an account
                    </a>
                </p>
            </div>
        </Container>
      )
    }

    const Container = styled.div`
    body {
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: sans-serif;
	line-height: 1.5;
	min-height: 100vh;
	background: #f3f3f3;
	flex-direction: column;
	margin: 0;
}

.main {
	background-color: #fff;
	border-radius: 15px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
	padding: 10px 20px;
    margin-top: 15px;
	transition: transform 0.2s;
	text-align: center;
}
.icon{
    color: #fe424d;
}

h1 {
	color: #fe424d;
}

label {
	display: block;
	width: 100%;
	margin-top: 10px;
	margin-bottom: 5px;
	text-align: left;
	color: #555;
	font-weight: bold;
}


input {
	display: block;
	width: 100%;
	margin-bottom: 15px;
	padding: 10px;
	box-sizing: border-box;
	border: 1px solid #ddd;
	border-radius: 5px;
}

.submitButton {
	padding: 15px;
	border-radius: 10px;
	margin-top: 15px;
	margin-bottom: 15px;
	border: none;
	color: white;
	cursor: pointer;
	background-color: #fe424d;
	width: 100%;
	font-size: 16px;
}

.wrap {
	display: flex;
	justify-content: center;
	align-items: center;
}
hr{
    color: #fe424d;
    opacity: 1;
}
.invalid-feedback{
    text-align: left;
}
  `;