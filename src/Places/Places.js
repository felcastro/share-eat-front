import React, { useState, useEffect } from 'react';

import './Places.css'
import PlaceCard from './PlaceCard'
import API from '../config';

const Places = () => {

    useEffect(() => { fetchPlaces(); }, []);

    const [places, setPlaces] = useState([]);

    const fetchPlaces = async () => {
        const data = await fetch(API + '/api/places');
        const places = await data.json();

        setPlaces(places);
    }

    return (
        <div className="container places">
            <div>
                <h1 className="places-title">Lugares</h1>
                <p>{places.length} lugares cadastrados</p>
            </div>
            <div className="places-cards">
                {places.map(place => (
                    <PlaceCard place={place}/>
                ))}
            </div>
        </div>
    );
}

export default Places;