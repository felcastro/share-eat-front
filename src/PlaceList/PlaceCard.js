import React from 'react';
import { Link } from 'react-router-dom';

const PlaceCard = ({ place }) => (
    <div className="place-list-card-area">
        <div className="place-list-item">
            <Link to={"/place/" + place.id}>
                <div className="place-list-card">
                    <h3>{place.name}</h3>
                    <p>{place.plates} {place.plates === 1 ? "prato" : "pratos"}</p>
                </div>
            </Link>
        </div>
        <div className="place-list-add-button">
            <Link to={'/place/' + place.id + '/new'}>
                <svg className="bi bi-plus-circle" width="3em" height="3em" viewBox="0 0 16 16" fill="white" strokeWidth="3">
                    <path fillRule="evenodd" d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clipRule="evenodd" />
                </svg>
            </Link>
        </div>
    </div>
);

export default PlaceCard;