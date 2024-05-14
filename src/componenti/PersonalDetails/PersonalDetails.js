import React from 'react'
import api from "../../api/axiosConfig"
import AtomicSpinner from 'atomic-spinner'
import { useState, useEffect } from 'react';
import './PersonalArea.css'
import { useNavigate } from 'react-router';
import { Link, useSearchParams, useParams } from 'react-router-dom';



const PersonalDetails = () => {
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
                    <h2 className="text-center text-uppercase">DETTAGLI DI {utente.cognome} {utente.nome}</h2>
                    <p><strong>Email:</strong> {utente.email}</p>
                    <p><strong>Nome:</strong> {utente.nome}</p>
                    <p><strong>Cognome:</strong> {utente.cognome}</p>
                    <p><strong>Modifica Password:</strong><a target='blank' href={resetPasswordLink} className="link">click here</a></p>
                </div>            
            </div>
        )
}
}

export default PersonalDetails