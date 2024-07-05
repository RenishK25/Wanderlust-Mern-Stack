import React, { useEffect, useState } from "react";
import Card from "./Card"
import { useDispatch, useSelector } from "react-redux";
import { allList } from "../../app/index"

export default React.memo(function Index() {
    const [taxes, setTaxes] = useState(false);
    const dispatch = useDispatch();

    const lists = useSelector((state) => state.list.lists);

    useEffect(() => {
        dispatch(allList());
    },[]);

    const getUserFromStorage = () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    };
    let taxShowHide = (e) => {
    if(e.target.checked){
            setTaxes(true);
        }else{
            setTaxes(false);
        }
    }
    return (
        <>
            <div className="filters">

            <div className="filter">
                <div><i className="fa-solid fa-mug-hot"></i></div>
                <p>Bed & Breakfast</p>
            </div>

            <div className="filter">
                <div><i className="fa-solid fa-tent"></i></div>
                <p>Camping</p>
            </div>

            <div className="filter">
                <div><i className="fa-solid fa-city"></i></div>
                <p>Iconic cities</p>
            </div>

            <div className="filter">
                <div><i className="fa-brands fa-fort-awesome"></i></div>
                <p>Castle</p>
            </div>

            <div className="filter">
                <div><i className="fa-solid fa-fire-flame-curved"></i></div>
                <p>Trending</p>
            </div>

            <div className="filter">
                <div><i className="fa-solid fa-umbrella-beach"></i></div>
                <p>Beach</p>
            </div>

            <div className="filter">
                <div><i className="fa-solid fa-water-ladder"></i></div>
                <p>Amazing pools</p>
            </div>

            <div className="filter">
                <div><i className="fa-regular fa-snowflake"></i></div>
                <p>Arctic</p>
            </div>

            <div className="filter">
                <div><i className="fa-solid fa-caravan"></i></div>
                <p>Camper vans</p>
            </div>

            <div className="filter-btn ms-auto">
                <div className="form-check form-switch form-check-reverse">
                    <input className="form-check-input" type="checkbox" id="show_gst_btn" onClick={taxShowHide} />
                    <label className="form-check-label" htmlFor="flexSwitchCheckReverse">Reverse switch checkbox input</label>
                </div>
            </div>

            </div>

            <div className="row row-cols-lg-4 row-cols-md-2 row-cols-sm-1">
            {lists.length > 1 &&
                lists.map((list, index) => {
                    return <Card list={list} key={index} taxes={taxes} />
                })
            } 
            </div>
        </>
    )
})