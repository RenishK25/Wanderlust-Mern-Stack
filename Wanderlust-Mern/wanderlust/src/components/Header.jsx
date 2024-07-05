import { useState } from "react"
import {Avatar, Stack } from '@mui/material';
import styled from "styled-components";
import axios from "axios";
// import { useUser } from '../app/UserContext';

export default function Header() {
  
  const getUserFromStorage = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  const [user, setUser] = useState(getUserFromStorage);
  // const { user, setUser } = useUser(); // Access the user from the context

  let logout = async () => {
    let logout = await axios.post("http://localhost:8000/logout", {}, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`
    }
    });
    if(logout){
      localStorage.removeItem('user');
      setUser(null);
    }else{
      console.log("LogOut Error");
    }
  }
  return (
    <Container>
    <nav className="navbar navbar-expand-md bg-body-light sticky-top">
    <div className="container container-fluid">
      <a className="navbar-brand" href="/"><i className="fa-solid fa-compass"></i></a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-link" href="/">Home</a>
          {/* <!-- <a className="nav-link" href="/">All Listing</a> --> */}
          <a className="nav-link" href="/add">Add listing</a>
        </div>
        
        <div className="navbar-nav nav-menu ms-auto">
          
          <div className="nav-link profile" href="/">
          <Stack direction="row" spacing={1}>
          <i className="fa-solid fa-list"></i>
          {user ? (
            <Avatar className="avatar" sx={{width:"2rem", height:"2rem"}}>{user.user.username[0].toUpperCase()}</Avatar>
          ) : (
              <Avatar></Avatar>
            ) }
          </Stack>

            <ul className="navbar-nav-menu">
            {user ? (
                <li onClick={logout}> Logout </li>
          ) : (
            <>
            <li><a href="/login"> Log in </a></li>
            <li><a href="/register"> Sign up </a></li> 
            </>
          )}
            </ul>
          </div>
          
        </div>
        
      </div>
    </div>
  </nav>
    </Container>
  )
}

const Container = styled.div`
  .fa-solid.fa-list{
    margin: auto;
  }  

`;