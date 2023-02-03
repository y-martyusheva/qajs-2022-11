import supertest from 'supertest';
import config from "./config.js";

const {url} = config;

const user = {
    createUser: (payload) => {
        return supertest(url)
            .post('/Account/v1/User')
            .send(payload)
    },
    token: (payload) => {
        return supertest(url)
            .post('/Account/v1/GenerateToken')
            .send(payload)
    },
    authorization: (payload, token) => {
        return supertest(url)
            .post('/Account/v1/Authorized')
            .set('Authorization', `Bearer ${token}`)
            .send(payload)
    },
    getUserInfo: (userId, token, payload) => {
        return supertest(url)
            .get(`/Account/v1/User/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(payload)
    },
    delete: (userId, token, payload) => {
        return supertest(url)
            .delete(`/Account/v1/User/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(payload)
    }
}

export default user
