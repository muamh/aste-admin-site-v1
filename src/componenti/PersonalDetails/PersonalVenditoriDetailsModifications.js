import React from 'react'
import api from "../../api/axiosConfig"
import AtomicSpinner from 'atomic-spinner'
import { useState, useEffect } from 'react';
import './PersonalArea.css'
import { useNavigate } from 'react-router';
import { Link, useSearchParams, useParams } from 'react-router-dom';
import SectionImmobili from '../SectionImmobili/SectionImmibili';



const PersonalVenditoriDetailsModifications = () => {
    const navigate = useNavigate();
    const [utente, setUtente] = useState(null);
    const [resetPasswordLink, setResetPasswordLink] = useState(null);
    const {uid} = useParams();

  

    useEffect(() => {
      console.log(uid);
        const fetchUtente = async () => {
          try {
            const risposta = await api.post("/api/v1/venditore/single/venditore/get/details/checkpoint", {identificator: uid});
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
            const risposta = await api.post("/api/v1/venditore/single/venditore/password/reset/checkpoint", {identificator: utente.uid});
            console.log("utente:", risposta.data);
            setResetPasswordLink(risposta.data);
          } catch (errore) {
            console.log("Errore:", errore);
          }
        };
      
        fetchResetPasswordLink(); // Chiamata alla funzione per ottenere gli immobili
      }, []);

      const salvaModificheHandler = async () => {
        if (document.getElementById("nome").value && document.getElementById("cognome").value
            && document.getElementById("piva").value) {
              api.post("/api/v1/venditore/single/venditore/updating/protected/checkpoint", {
                uid: utente.uid,
                identificator: sessionStorage.getItem("identificator"), 
                nome: document.getElementById("nome").value, 
                cognome: document.getElementById("cognome").value,
                piva: document.getElementById("piva").value})
              .then(response => alert(response.data)).catch(erroe => console.log(erroe))
              navigate("/pagina/lista/gestione/venditori");
        }
        else{
            alert("Tutti i campi devono essere riempiti");
        }
    }

    const tornaInditroHanlder = () => {
      navigate("/pagina/lista/gestione/venditori");
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
                            <input type="text" defaultValue={utente.nome} className="form-control border-0 py-3" placeholder="Nome venditore" style={{ color: 'black' }} id='nome' key={"nome"}/>
                        </div></p>
                    <p><strong>Cognome:</strong>
                        <div className="col-md">
                            <input type="text" defaultValue={utente.cognome} className="form-control border-0 py-3" placeholder="Cognome venditore" style={{ color: 'black' }} id='cognome' key={"cognome"}/>
                        </div>
                    </p>
                    <p><strong>Partita IVA:</strong>
                        <div className="col-md">
                            <input type="text" defaultValue={utente.piva} className="form-control border-0 py-3" placeholder="Partita IVA venditore" style={{ color: 'black' }} id='piva' key={"piva"}/>
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

export default PersonalVenditoriDetailsModifications