import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ImmobileDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import api from "../../api/axiosConfig";
import { Link, useParams } from 'react-router-dom'; // Importa il hook useParams
import AtomicSpinner from 'atomic-spinner'
import { faHeart, faBookBookmark } from '@fortawesome/free-solid-svg-icons';

const ImmobileDetail = (props) => {

  const [immobile, setImmobile] = useState(null);
  const { casaid } = useParams();

  useEffect(() => {
    const fetchImmobile = async () => {
      try {
        console.log("\n\n\n\nCASA ID: \n" + casaid + "\n\n\n");
        const risposta = await api.get("/api/v1/caseList/" + casaid);
        console.log("Immobili:", risposta.data);
        setImmobile(risposta.data);
        
      } catch (errore) {
        console.log("Errore:", errore);
      }
    };
  
    fetchImmobile(); // Chiamata alla funzione per ottenere gli immobili
  }, []);
  


  const [mainImageIndex, setMainImageIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };

  const handleDeleteButton = () =>{
    const identificatore = sessionStorage.getItem("identificator");
    const lav = api.post("/api/v1/caseList/authorized/elimination/of/house", {casaId: casaid, identificator: identificatore}).then(response => console.log(response.data)).catch(error => error);
    console.log(lav);
    alert(lav);
  }

  const handelImgSuccessiva = () => {
    const nextIndex = (mainImageIndex + 1) % immobile.immagini.length;
    setMainImageIndex(nextIndex);
  };

  const handelImgPrecedente = () => {
    const prevIndex = (mainImageIndex - 1 + immobile.immagini.length) % immobile.immagini.length;
    setMainImageIndex(prevIndex);
  };

  

  if (!immobile) {
    return (
      <div style={{color:"white",display: "flex" ,alignItems : "center", backgroundColor:"black", justifyContent:"space-around", flexDirection:"column"}}>
        <AtomicSpinner 
              electronColorPalette={[ "#0081C9", "#5BC0F8", "#86E5FF", "#345b66"]}
              nucleusParticleFillColor='#163219'
              atomSize={475}
              electronPathCount={4}
        />
      </div>
    );
  } else{
    return (
      <div className='container-fluid  wow fadeIn justify-content-center'  style={{color:"white",display: "flex" ,alignItems : "center", backgroundColor:"black", justifyContent:"space-around", flexDirection:"column"}}>
        <div className="container row g-2 justify-content-center" >
          <div className="col-md-5 contenitoreProduct  justify-content-center  mx-auto">
            <div className='caroselloProdotto ' style={{display: 'flex', justifyContent: 'center'}}>
              <button onClick={handelImgPrecedente} className="nav-button p-2" style={{ opacity: 0.5, fontSize: '18px' }}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <img src={immobile.immagini[mainImageIndex]} alt="Immagine principale" className='product-immagine' />
              <button onClick={handelImgSuccessiva} className="nav-button p-2" style={{ opacity: 0.5, fontSize: '18px' }}>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
            <Slider {...settings} style={{ marginTop: '20px', marginBottom: '20px' }}>
              {immobile.immagini.map((image, index) => (
                <div key={index} onClick={() => setMainImageIndex(index)} style={{ cursor: 'pointer' }} >
                  <img src={image} alt={`Immagine ${index + 1}`} className='immagineLista'/>
                </div>
              ))}
            </Slider>
          </div>
          <div className='descrizione col-md-5 text-uppercase mx-auto' style={{ color: 'white', fontFamily: 'Arial, sans-serif', padding: '20px', marginTop: '20px', backgroundColor: '#333', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h1 style={{ color: '#66CCFF', marginBottom: '10px', fontSize: '30px', fontWeight:'bolder' }}><strong>{immobile.casa}</strong></h1>
            <p style={{ marginBottom: '10px', fontSize: '18px' }}>Descrizione: {immobile.descrizione}</p>
            <p style={{ marginBottom: '10px', fontSize: '18px' }}>Prezzo: {immobile.prezzo} €</p>
            <p style={{ marginBottom: '10px', fontSize: '18px' }}>Regione: {immobile.regione}</p>
            <p style={{ marginBottom: '10px', fontSize: '18px' }}>Provincia: {immobile.provincia}</p>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: '' , fontSize:'30px'}}>
              <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer', marginRight: '35px', color:'red'}} onClick={handleDeleteButton} />
            </div>
            {/* Aggiungi altre informazioni necessarie qui */}
          </div>

        </div>
      </div>
    );
  }
}

export default ImmobileDetail;
