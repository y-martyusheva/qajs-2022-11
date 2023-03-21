import supertest from 'supertest';
import bookstoreConfig from "./bookstore.config.js";

const {url} = bookstoreConfig;

export const user = {
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
    },
    async getToken() {
        const payload = bookstoreConfig.booksCreator;
        const res = await this.token(payload);

        return res.body.token;
    }
}

