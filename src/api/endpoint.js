import axios from "axios";

const instance = axios.create({
    baseURL: 'http://192.168.1.12:8000/api',
    withXSRFToken: true,
    withCredentials: true
});

export const authUser = async (body)=>{
    const header = {
        'Content-Type': 'application/json'
    }
    return await instance.post('/login', body, header)
        .then( result => result.data)
        .catch(error => error.response.data)
}

export const registerUser = async (body)=>{
    const header = {
        'Content-Type': 'application/json'
    }
    return await instance.post('/register', body, header)
        .then( result => result.data)
        .catch(error => error.response.data)
}

export const onRegisterModel = async (body, token)=>{
    const header = {
        'Content-Type': 'application/json',
        headers: { Authorization: `Bearer ${token}` },
    }
    return await instance.post('/models', body, header)
        .then( result => result.data)
        .catch(error => error.response.data)
}

export const onRegisterClient = async (body, token)=>{
    const header = {
        'Content-Type': 'application/json',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    }
    return await instance.post('/clients', body, header)
        .then( result => result.data)
        .catch(error => error.response.data)
}

export const onUpdateClient = async (body,id, token)=>{
    const header = {
        'Content-Type': 'application/json',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    }
    return await instance.post(`/clients/update/${id}`, body, header)
        .then( result => result.data)
        .catch(error => error.response.data)
}

export const onUpdateGarment = async (body,id, token)=>{
    const header = {
        'Content-Type': 'application/json',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    }
    return await instance.post(`/garments/update/${id}`, body, header)
        .then( result => result.data)
        .catch(error => error.response.data)
}

export const getAllModel = async (token)=>{
    const header = {
        'Content-Type': 'application/json',
        headers: { Authorization: `Bearer ${token}` },
    }
    return await instance.get('/garment-models', header)
        .then( result => result.data)
        .catch(error => error.response.data)
}

export const getAllGarmentModelsItems = async (token, modelId)=>{
    const header = {
        'Content-Type': 'application/json',
        headers: { Authorization: `Bearer ${token}` },
    }
    return await instance.get(`/garments/models/${modelId}`, header)
        .then( result => result.data)
        .catch(error => error.response.data)
}

export const getClientGarmentModelsItemsValues = async (token, clientId,modelId)=>{
    const header = {
        'Content-Type': 'application/json',
        headers: { Authorization: `Bearer ${token}` },
    }
    return await instance.get(`/last-garment/${clientId}/${modelId}`, header)
        .then( result => result.data)
        .catch(error => error.response.data)
}

export const getGarmentModelsItemsValues = async (token, garmentId)=>{
    const header = {
        'Content-Type': 'application/json',
        headers: { Authorization: `Bearer ${token}` },
    }
    return await instance.get(`/garment/models/items/values/${garmentId}`, header)
        .then( result => result.data)
        .catch(error => error.response.data)
}

export const getAllClient = async (token)=>{
    const header = {
        'Content-Type': 'application/json',
        headers: { Authorization: `Bearer ${token}` },
    }
    return await instance.get('/clients', header)
        .then( result => result.data)
        .catch(error => error.response.data)
}

export const getAllClientRdv = async (token)=>{
    const header = {
        'Content-Type': 'application/json',
        headers: { Authorization: `Bearer ${token}` },
    }
    return await instance.get('/tailor-rdv', header)
        .then( result => result.data)
        .catch(error => error.response.data)
}

export const onRegisterGarment = async (body, token)=>{
    
    const header = {
        
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    }
    return await instance.post('/garments', body, header)
        .then( result =>result.data)
        .catch(error => console.log(error.response.data))
}

export const getAllGarment = async (token, clientId)=>{
    const header = {
        'Content-Type': 'application/json',
        headers: { Authorization: `Bearer ${token}` },
    }
    return await instance.get(`/garments/client/${clientId}`, header)
        .then( result => result.data)
        .catch(error => error.response.data)
}

export const getAllGarmentFilterDate = async (token, clientId, dateValue)=>{
    const header = {
        'Content-Type': 'application/json',
        headers: { Authorization: `Bearer ${token}` },
    }
    return await instance.get(`/garments/client/date/${clientId}/${dateValue}`, header)
        .then( result => result.data)
        .catch(error => error.response.data)
}

export const getGarment = async (token, garment)=>{
    const header = {
        'Content-Type': 'application/json',
        headers: { Authorization: `Bearer ${token}` },
    }
    return await instance.get(`/garments/${garment}`, header)
        .then( result => result.data)
        .catch(error => error.response.data)
}

export const getClientsSearch = async (token, txt)=>{
    const header = {
        'Content-Type': 'application/json',
        headers: { Authorization: `Bearer ${token}` },
    }
    return await instance.get(`/clients/search/${txt}`, header)
        .then( result => result.data)
        .catch(error => error.response.data)
}

export const logout = async (token)=>{
    const header = {
        'Content-Type': 'application/json',
        headers: { Authorization: `Bearer ${token}` },
    }
    return await instance.post(`/logout`, {}, header)
        .then( result => result.data)
        .catch(error => error.response.data)
}

export const statistiques = async (token)=>{
    const header = {
        'Content-Type': 'application/json',
        headers: { Authorization: `Bearer ${token}` },
    }
    return await instance.get(`/statistiques`, header)
        .then( result => result.data)
        .catch(error => error.response.data)
}