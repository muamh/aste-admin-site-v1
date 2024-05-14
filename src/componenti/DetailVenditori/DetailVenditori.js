import api from "../../api/axiosConfig"
import AtomicSpinner from 'atomic-spinner'
import { useState, useEffect } from 'react';
import SectionUsers from "../SectionUsers/SectionUsers";
import SectionVenditori from "../SectionVenditori/SectionVenditori";

const DetailVenditori = (props) => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        const fetchLiked = async () => {
          try {
            const risposta = await api.post("/api/v1/venditore", {identificator: sessionStorage.getItem("identificator")});
            console.log("users:", risposta.data);
            setUsers(risposta.data);
          } catch (errore) {
            console.log("Errore:", errore);
            props.onLoading(true);
          }
        };
      
        fetchLiked(); // Chiamata alla funzione per ottenere gli immobili
      }, []);

    if (!users) {
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
        return (<SectionVenditori userCards={users}/>)
    }
}

export default DetailVenditori