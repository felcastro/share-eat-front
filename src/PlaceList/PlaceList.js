import React, { useState, useEffect } from 'react';

import './PlaceList.css'
import PlaceCard from './PlaceCard'
import API from '../config';

const Places = () => {

    document.body.style.background = '#292929';

    useEffect(() => { fetchPlaces(); }, []);

    const [places, setPlaces] = useState([]);

    const fetchPlaces = async () => {
        const data = await fetch(API + '/api/places');
        const places = await data.json();

        setPlaces(places);
    }

    return (
        <div>
            <h1 className="page-title">Lugares</h1>
            <p className="page-subtitle">{places.length} {places.length === 1 ? "lugar cadastrado" : "lugares cadastrados"}</p>
            <div className="place-list-cards">
                {places.map((place, i) => (
                    <PlaceCard place={place} key={i} />
                ))}
            </div>
        </div>
    );
}

export default Places;