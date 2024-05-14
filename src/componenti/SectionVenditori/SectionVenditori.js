import React from 'react';
import { Link } from 'react-router-dom'
import api from "../../api/axiosConfig"
import { useState, useEffect } from 'react';
import './SectionVenditori.css'

const UserCard = ({ user }) => {

    const eliminazione = () =>{
        const result = api.post("/api/v1/venditore/single/venditore/deleting/protected/checkpoint", {uid: user.uid, identificator: sessionStorage.getItem("identificator")}).then(result => result.data);
        alert(result);
        window.location.reload();
    }

        return (
            <tr height='50'>
                <td>{user.uid}</td>
                <td>{user.email}</td>
                <td>{user.cognome}</td>
                <td>{user.piva}</td>
                <td>
                    <Link to={`/single/venditore/details/${user.uid}`}>
                        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-search' viewBox='0 0 16 16'>
                            <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0'/>
                        </svg>
                    </Link>
                </td>
                <td>
                    <Link to={`/single/venditore/modifications/${user.uid}`}>
                        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-pencil-square' viewBox='0 0 16 16'>
                            <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z'/>
                            <path fillRule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z'/>
                        </svg>
                    </Link>
                </td>
                <td>
                    <button onClick={eliminazione} className="btn btn-danger btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eraser" viewBox="0 0 16 16">
                        <path d='M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z'/>                        </svg>
                    </button>
                </td>
            </tr>
        )
    
};


const UsersCardGroup = ({ userCards }) => {
    // Verifica se immobili è null prima di mappare
    if (!userCards) {
        return null; // Se immobili è null, restituisci null
    }

    console.log("immobili dentro ImmobileCardGroup:\n" + JSON.stringify(userCards))
    return (
        userCards.map((user) => {
            console.log("Entro");
            console.log("entrato" + JSON.stringify(user));
            return (<UserCard user={user} />);
        })

    );
};


const SectionVenditori = ({ userCards }) => {
    return (
        <div className="tab-content m-5 ">
            <div id="tab-1" className="tab-pane fade show p-1 active" >
                <div className="row g-4" >
                    <div class="wrap">
                        <div style={{ marginLeft: '1%' }}>
                            <h1 class="display-1">Elenco venditori</h1>
                        </div>
                    </div>
                    <table className='table table-hover table-dark'>
                        <thead style={{fontSize: '21px'}}>
                            <tr>
                                <th>Id</th>
                                <th>Email</th>
                                <th>Cognome</th>
                                <th>P. IVA</th>
                                <th colspan="3">Operazioni</th>
                            </tr>
                        </thead>
                        <tbody>
                            <UsersCardGroup userCards={userCards} />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SectionVenditori;
