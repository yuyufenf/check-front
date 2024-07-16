import axios from 'axios';
import qs from 'qs';
import storage from "@/utils/localStorage.js";

const axiosInstance = axios.create({
    baseURL: '/check',
    timeout: 5000
})

const serializer = (params) => {
    return qs.stringify(params, { arrayFormat: 'repeat',  allowDots: true});
}

const get = (url, data = {}) => {
    return axiosInstance.get(url, {params: data}, serializer).then((res) => res.data)
}

const post = (url, data = null) => {
    return axiosInstance.post(url, data, {
        headers:{
            'Authorization': `Bearer ${storage.get('token')}`,
            'content-type': 'application/json',
        },
    }).then((res) => res.data)
}

const postFile = (url, data = null) => {
    return axiosInstance.post(url, data, {
        headers:{
            'Authorization': `Bearer ${storage.get('token')}`,
            'content-type': 'multipart/form-data',
        }
    }).then((res) => res.data)
}

export default {get, post, postFile}