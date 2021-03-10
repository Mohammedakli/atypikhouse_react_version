import React, { useEffect, useState } from "react";
import LeftNavAdmin from "../../components/LeftNavAdmin";
import { MDBTable, MDBTableBody, MDBTableFoot, MDBTableHead } from 'mdbreact';
import { dateParser, isEmpty } from "../../components/Utilitaires";
import { useSelector} from "react-redux";
import { deleteUser } from "../../actions/userAction"
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const Gestion_pro = () => {
    const [isLoading, setIsLoading] = useState(true);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const posts = useSelector((state) => state.postReducer);
    const dispatch = useDispatch();
    const deleteQuote = id => dispatch(deleteUser(id));
    

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
      }, [usersData]);



    return (
        <div >
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
                    <br />
                    <h1>Gestion des propriétaires</h1>
                    <>
                    {isLoading ? (
                        <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                    <MDBTable>
                        <MDBTableHead color="primary-color">
                            <tr>
                                <th>Image</th>
                                <th>Pseudo</th>
                                <th>Email</th>
                                <th>Membre depuis</th>
                                <th>Nombre de Post</th>
                                <th>Actions</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {!isEmpty(usersData[0]) &&
                                usersData.map((user) => {
                                    if ( user.role === "propriétaire") {
                                    return (
                                        <tr>
                                            <td><img height="40" width="40" style={{ borderRadius: "50%" }}
                                                src={user.picture}
                                                alt="poster-pic"
                                            /></td>
                                            <td>{user.pseudo}</td>
                                            <td>{user.email}</td>
                                            <td>{dateParser(user.createdAt)}</td>
                                            <td>    
                                                {!isEmpty(posts[0]) &&
                                                    posts.map((post) => {
                                                        if ( post.posterId === user._id) {
                                                           return 
                                                        }
                                                    })
                                                }
                                            </td>
                                            <td>
                                                <button type="submit" className="btn btn-danger" 
                                                    onClick={() => {
                                                        if (window.confirm("Voulez-vous supprimer cet utilisateur ?")) {
                                                            deleteQuote(user._id);
                                                            
                                                        }
                                                    }}
                                                >
                                                    <i class="fas fa-trash-alt"></i>
                                                </button>
                                                {" "}
                                                <button type="submit" className="btn btn-info">
                                                    <i className="fas fa-user-edit"></i>
                                                </button>
                                                {" "}
                                                <button type="submit" className="btn btn-warning" >
                                                    <a style={{ color: 'black' }} href={`/user_view/${user._id}`} >
                                                        <i className="fas fa-eye"></i>
                                                    </a>
                                                </button>
                                                
                                            </td>
                                        </tr>
                                    ) }
                                })}

                        </MDBTableBody>
                    </MDBTable>
                    )}
                    </>
                    <MDBTableFoot>Created by "@Merith"</MDBTableFoot>

                    
                </div>
            </div>
        </div>
    );
}
export default Gestion_pro;