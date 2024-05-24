import { useState } from "react"
import {Avatar, Stack } from '@mui/material';
import styled from "styled-components";


export default function Header() {
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
          <Avatar className="avatar" sx={{width:"2rem", height:"2rem"}}>R</Avatar>

          </Stack>
            {/* <i className="fa-solid fa-list"></i> */}
            {/* <% if(user && user != undefined){ %> */}
              {/* <%= user.username %> */}
            {/* <% }else{ %> */}
              {/* <i className="fa-solid fa-user"></i> */}
              {/* <Avatar></Avatar> */}
            {/* <% } %> */}
            <ul className="navbar-nav-menu">
              {/* <% if(user && user != undefined){ %> */}
                {/* <li><a href="/logout"> Logout </a></li> */}
              {/* <% }else{ %> */}
              {/* <li><a href="/login"> Log in </a></li>
              <li><a href="/signup"> Sign up </a></li> */}
              <a href="/login"><li> Log in </li></a>
              <a href="/signup"><li> Sign up </li></a>
             {/* <% } %> */}
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