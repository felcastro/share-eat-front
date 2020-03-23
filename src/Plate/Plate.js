import React, { useState, useEffect } from 'react';

import './Plate.css'
import { useHistory } from 'react-router-dom';
import API from '../config';

const Plate = ({ match }) => {

    document.body.style.background = '#464646'

    useEffect(() => {
        fetchPlace();
        if (match.params.plateId) {
            fetchPlate();
        }
    }, []);

    const [formName, setName] = useState('');
    const [formPrice, setPrice] = useState(0);
    const [formDescription, setDescription] = useState('');
    const [formErrors, setFormErrors] = useState({ started: true });
    const [formError, setFormError] = useState();
    const [loadError, setLoadError] = useState(false);
    const [loadErrorMessage, setLoadErrorMessage] = useState('');

    const [place, setPlace] = useState([]);

    let history = useHistory();

    useEffect(() => {
        if (Object.keys(formErrors).length === 0) {
            postData();
        }
    }, [formErrors])

    const validateForm = () => {
        var errors = {};
        if (formName === '') {
            errors.formName = 'Por favor, nomeie do prato.'
        }
        if (formPrice === 0) {
            errors.formPrice = 'Por favor, informe o valor do prato.'
        }
        if (formDescription === '') {
            errors.formDescription = 'Por favor, descreva o prato.'
        }

        setFormErrors(errors);
    }

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

    const fetchPlate = async () => {
        const data = await fetch(API + '/api/plates/' + match.params.plateId);

        if (data.status === 404) {
            setLoadError(true);
            setLoadErrorMessage('Erro ao carregar o prato.')
        } else {
            const plate = await data.json();

            setName(plate.name);
            setPrice(plate.price);
            setDescription(plate.description);
        }
    }

    const handleSubmit = () => {
        validateForm();
    }

    const validateName = (value) => {
        if (value.length <= 80) {
            setName(value);
        }
    }

    const validateDescription = (value) => {
        if (value.length <= 200) {
            setDescription(value);
        }
    }

    const postData = async () => {
        const postUrl = API + '/api/plates/';
        const putUrl = API + '/api/plates/' + match.params.plateId;
        const body = { name: formName, price: parseFloat(formPrice), description: formDescription, place_id: parseInt(match.params.id) };
        console.log(body);
        const response = await fetch(match.params.plateId ? putUrl : postUrl, {
            method: match.params.plateId ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (response.status === 200) {
            history.push('/place/' + match.params.id);
        } else if (response.status === 400) {
            const error = await response.json();
            setFormError(error.error.message.toString());
        } else {
            setFormError('Um erro inesperado ocorreu. Tente novamente.');
        }
    }

    const deleteData = async () => {
        const response = await fetch(API + '/api/plates/' + match.params.plateId, {
            method: 'DELETE',
        });

        if (response.status === 200) {
            history.push('/place/' + match.params.id);
        } else {
            console.log('erro');
        }
    }

    const mainPage = () => (
        <div>
            <h1 className="page-title">{place.name}</h1>
            <form className="plate-form">
                <div>
                    <div className="form-group">
                        <label htmlFor="plateNameTxt">Nome do prato</label>
                        <input type="text" className={`form-control ${formErrors.formName ? "is-invalid" : ""}`} id="plateNameTxt" placeholder="Prato" value={formName}
                            onChange={e => validateName(e.target.value)} required />
                        <div className="form-field-error">
                            {formErrors.formName}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="platePriceTxt">Valor</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">R$</div>
                            </div>
                            <input type="number" className={`form-control ${formErrors.formPrice ? "is-invalid" : ""}`} id="platePriceTxt"
                                value={formPrice} onChange={e => setPrice(e.target.value)} style={{ maxWidth: '130px' }} required />
                        </div>
                        <div className="form-field-error">
                            {formErrors.formPrice}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="plateDescriptionTxt">Descrição do prato</label>
                        <textarea className={`form-control ${formErrors.formDescription ? "is-invalid" : ""}`} id="plateDescriptionTxt" maxLength="200" rows="5" placeholder="Insira uma descrição"
                            value={formDescription} onChange={e => validateDescription(e.target.value)} required />
                        <small id="plateDescriptionHelp" className="form-text">*A descrição deve conter até 200 caracteres.</small>
                        <div className="form-field-error">
                            {formErrors.formDescription}
                        </div>
                    </div>
                </div>
                {formError &&
                    <div className="alert alert-danger">
                        {formError}
                    </div>}
                <button type="button" className="btn-lg btn-block fixed-submit-btn" onClick={handleSubmit}>Salvar</button>
                {match.params.plateId &&
                    <button type="button" className="btn-danger btn-lg btn-block " onClick={deleteData}>Deletar</button>
                }
            </form>
        </div>
    )

    const errorPage = () => (
        <div style={{color: 'red'}}>{loadErrorMessage}</div>
    );

    return loadError ? errorPage() : mainPage();
};

export default Plate;