import React from 'react';
import { Link } from 'react-router-dom';

const PlateCard = ({ plate, placeId }) => (
    <Link to={'/place/' + placeId + '/plate/' + plate.id} style={{ textDecoration: 'none' }}>
        <div className="plate-card">
            <div className="plate-card-inner">
                <div className="plate-card-title">
                    <div style={{flexGrow: 1, overflow: 'hidden'}}>
                        <h3 style={{overflowWrap: 'break-word'}}>{plate.name}</h3>
                    </div>
                    <span>R$ {plate.price.toFixed(2).toString().replace('.', ',')}</span>
                </div>
                <div className="row">
                    <div className="col-10" style={{overflowWrap: 'break-word'}}>
                        <p>{plate.description}</p>
                    </div>
                </div>

            </div>
        </div>
    </Link>
);

export default PlateCard;