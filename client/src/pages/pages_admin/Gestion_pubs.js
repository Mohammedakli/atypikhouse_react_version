import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LeftNavAdmin from "../../components/LeftNavAdmin";
import SearchForm from "../../components/Post/SearchForm";
import ThreadAdmin from "../../components/ThreadAdmin";

const Gestion_pubs = () => {
    const userData = useSelector((state) => state.userReducer);
    return (
        <div>
            <nav style={{ backgroundColor: 'green' }}>
            <NavLink exact to="/gestion">
                <h3 style={{ color: 'white', fontFamily: 'fantasy', marginLeft: '20px', paddingTop: '20px' }}>AtypikHouse@Dashboard</h3>
            </NavLink>
            <h6 style={{textAlign:'right', fontWeight:'bolder', color:'black'}}>What's up, {userData.pseudo}!</h6>
            </nav>
            <div className="row">
                <div className="col-3">
                    <LeftNavAdmin />
                </div>
                <div className="col-9">
                    <br/>
                    <h1>Gestion des publications</h1>
                    <div className="container">
                        <SearchForm/>
                        <ThreadAdmin/>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
export default Gestion_pubs;