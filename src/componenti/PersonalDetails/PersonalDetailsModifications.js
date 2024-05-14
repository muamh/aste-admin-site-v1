import React from 'react'
import api from "../../api/axiosConfig"
import AtomicSpinner from 'atomic-spinner'
import { useState, useEffect } from 'react';
import './PersonalArea.css'
import { useNavigate } from 'react-router';
import { Link, useSearchParams, useParams } from 'react-router-dom';



const PersonalDetailsModifications = () => {
    const navigate = useNavigate();
    const [utente, setUtente] = useState(null);
    const [resetPasswordLink, setResetPasswordLink] = useState(null);
    const {uid} = useParams();

    useEffect(() => {
      console.log(uid);
        const fetchUtente = async () => {
          try {
            const risposta = await api.post("/api/v1/users/single/user/get/details/checkpoint", {identificator: uid});
            console.log("utente:", risposta.data);
            setUtente(risposta.data);
          } catch (errore) {
            console.log("Errore:", errore);
          }
        };
      
        fetchUtente(); // Chiamata alla funzione per ottenere gli immobili
      }, []);

      useEffect(() => {
        const fetchResetPasswordLink = async () => {
          try {
            const risposta = await api.post("/api/v1/users/single/user/password/reset/checkpoint", {identificator: sessionStorage.getItem("identificator")});
            console.log("utente:", risposta.data);
            setResetPasswordLink(risposta.data);
          } catch (errore) {
            console.log("Errore:", errore);
          }
        };
      
        fetchResetPasswordLink(); // Chiamata alla funzione per ottenere gli immobili
      }, []);

      const salvaModificheHandler = async () => {
        if (document.getElementById("nome").value && document.getElementById("cognome").value) {
              api.post("/api/v1/users/single/user/updating/protected/checkpoint", {
                uid: utente.uid,
                identificator: sessionStorage.getItem("identificator"), 
                nome: document.getElementById("nome").value, 
                cognome: document.getElementById("cognome").value})
              .then(response => alert(response.data)).catch(erroe => console.log(erroe))
              navigate("/pagina/lista/gestione/utenti");
        }
        else{
            alert("Tutti i campi devono essere riempiti");
        }
    }

    const tornaInditroHanlder = () => {
      navigate("/pagina/lista/gestione/utenti");
    }

      if (!utente) {
        return (
            <div className='App' style={{color:"white",display: "flex" ,alignItems : "center", backgroundColor:"black", justifyContent:"space-around", flexDirection:"column"}}>
                <AtomicSpinner 
                    electronColorPalette={[ "#0081C9", "#5BC0F8", "#86E5FF", "#345b66"]}
                    nucleusParticleFillColor='#163219'
                    atomSize={475}
                    electronPathCount={4}
                />
                <div>caricamento...</div>
                
            </div>
        );
    } else{
        return (
            <div>
                <div className="container personal">
                    <h2 className="text-center text-uppercase">MODIFICA DI {utente.cognome} {utente.nome}</h2>
                    <p><strong>Email:</strong> {utente.email}</p>
                    <p><strong>Nome:</strong>
                        <div className="col-md">
                            <input type="text" defaultValue={utente.nome} className="form-control border-0 py-3" placeholder="Nome utente" style={{ color: 'black' }} id='nome' key={"nome"}/>
                        </div></p>
                    <p><strong>Cognome:</strong>
                        <div className="col-md">
                            <input type="text" defaultValue={utente.cognome} className="form-control border-0 py-3" placeholder="Cognome utente" style={{ color: 'black' }} id='cognome' key={"cognome"}/>
                        </div>
                    </p>
                    <div className="">
                        <button 
                            className="btn btn-primary border-0 w-100 py-3 mb-3" 
                            id='searchButton'
                            onClick={salvaModificheHandler}
                        >Salva Modifiche</button>
                    </div>
                    <div className="">
                        <button 
                            className="btn btn-primary border-0 w-100 py-3" 
                            id='searchButton'
                            onClick={tornaInditroHanlder}
                        >Torna Indietro</button>
                    </div>
                </div>            
            </div>
        )
}
}

export default PersonalDetailsModifications