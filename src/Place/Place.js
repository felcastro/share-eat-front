import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Place.css'
import PlateCard from './PlateCard';
import API from '../config';

const Place = ({ match }) => {

    document.body.style.background = '#353535';

    useEffect(() => { fetchPlace(); }, []);

    const [place, setPlace] = useState({ plates: [] });
    const [loadError, setLoadError] = useState(false);
    const [loadErrorMessage, setLoadErrorMessage] = useState('');

    const fetchPlace = async () => {
        const data = await fetch(API + '/api/places/' + match.params.id);
        if (data.status === 404) {
            setLoadError(true);
            setLoadErrorMessage('Erro ao carregar o local.')
        } else {
            const place = await data.json();
            setPlace(place);
        }
    }

    const mainPage = () => (
        <div>
            <h1 className="page-title">{place.name}</h1>
            <p className="page-subtitle">{place.plates.length} {place.plates.length === 1 ? "prato" : "pratos"}</p>
            <div className="list-cards">
                {place.plates ? place.plates.map((plate, i) => (
                    <PlateCard plate={plate} placeId={match.params.id} key={i} />
                )) : null}
            </div>
            <Link to={'/place/' + place.id + '/new'} className="float-btn">
                <svg className="bi bi-plus float-btn-icon" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z" clipRule="evenodd" />
                </svg>
            </Link>
        </div>
    );

    const errorPage = () => (
        <div style={{ color: 'red' }}>{loadErrorMessage}</div>
    );

    return (
        loadError ? errorPage() : mainPage()
    );
};

export default Place;