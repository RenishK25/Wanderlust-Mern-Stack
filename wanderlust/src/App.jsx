import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Index from './components/list/Index'
import AddList from "./components/list/AddList";
import EditList from "./components/list/EditList";
import ListShow from "./components/list/ListShow";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="/add" element={<AddList />} />
        <Route exact path="/show" element={<ListShow />} />
        <Route exact path="/edit" element={<EditList />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
