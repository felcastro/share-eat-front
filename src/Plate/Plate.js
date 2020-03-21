import React, { useState, useEffect } from 'react';

import './Plate.css'
import { useHistory } from 'react-router-dom';
import API from '../config';

const Plate = ({ match }) => {
    useEffect(() => { 
        fetchPlace(); 
        if (match.params.plateId) {
            fetchPlate();
        }
    }, []);

    const [formName, setName] = useState('');
    const [formPrice, setPrice] = useState(0);
    const [formDescription, setDescription] = useState('');

    const [place, setPlace] = useState([]);

    let history = useHistory();

    const fetchPlace = async () => {
        const data = await fetch(API + '/api/places/' + match.params.id);
        const place = await data.json();

        setPlace(place);
    }

    const fetchPlate = async () => {
        const data = await fetch(API + '/api/plates/' + match.params.plateId);
        const plate = await data.json();

        setName(plate.name);
        setPrice(plate.price);
        setDescription(plate.description); 
    }

    const postData = async () => {
        const postUrl = API + '/api/plates/';
        const putUrl = API + '/api/plates/' + match.params.plateId;
        const response = await fetch(match.params.plateId ? putUrl : postUrl, {
            method: match.params.plateId ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: formName, price: formPrice, description: formDescription, place_id: match.params.id})
        });

        if (response.status === 200) {
            history.push('/place/' + match.params.id);
        }
    }

    const deleteData = async () => {
        const response = await fetch(API + '/api/plates/' + match.params.plateId, {
            method: 'DELETE',
        });

        if (response.status === 200) {
            history.push('/place/' + match.params.id);
        }
    }

    return (
        <div className="container">
            <div>
                <h1 className="places-title">{place.name}</h1>
            </div>
            <form>
                <div className="form-group">
                    <label htmlFor="plateNameTxt">Nome do prato</label>
                    <input type="text" className="form-control" id="plateNameTxt" placeholder="Prato" value={formName} onChange={e => setName(e.target.value)} />
                </div>
                <div className="row">
                    <div className="form-group col-5">
                        <label htmlFor="platePriceTxt">Valor</label>
                        <input type="number" className="form-control" id="platePriceTxt" value={formPrice} onChange={e => setPrice(e.target.value)} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="plateDescriptionTxt">Descrição do prato</label>
                    <textarea className="form-control" id="plateDescriptionTxt" maxLength="200" rows="5" placeholder="Insira uma descrição"
                    value={formDescription} onChange={e => setDescription(e.target.value)}></textarea>
                    <small id="plateDescriptionHelp" className="form-text">*A descrição deve conter até 200 caracteres.</small>
                </div>
                <button type="button" className="btn-lg btn-block fixed-submit-btn" onClick={postData}>Salvar</button>
                <button type="button" className="btn-danger btn-lg btn-block " onClick={deleteData}>Deletar</button>
            </form>
        </div>
    );
};

export default Plate;