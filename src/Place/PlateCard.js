import React from 'react';

const PlateCard = ({ plate }) => (
    <div className="plate-card">
        <div className="plate-card-inner">
            <div className="plate-card-title">
                <span className="card-title">{plate.name}</span>
                <span className="card-title">R$ {plate.price.toFixed(2).toString().replace('.', ',')}</span>
            </div>
            <div className="row">
                <div className="col-10">
                    <p>{plate.description}</p>
                </div>
            </div>
            
        </div>
    </div>
);

export default PlateCard;