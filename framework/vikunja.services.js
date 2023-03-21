import vikunjaConfig from './vikunja.config.js';
import supertest from 'supertest';

const {url} = vikunjaConfig;

export const user = {
    login: (payload) => {
        return supertest(url)
            .post('/login')
            .send(payload)
    },
    async getToken() {
        const payload = vikunjaConfig.credentials;
        const res = await this.login(payload);

        return res.body.token;
    }
}

export const task = {
    createTask: (token, payload) => {
        return supertest(url)
            .put('/lists/1')
            .set('Authorization', `Bearer ${token}`)
            .send(payload)
    },
    updateTask: (taskID, token, payload) => {
      return supertest(url)
          .post(`/tasks/${taskID}`)
          .set('Authorization', `Bearer ${token}`)
          .send(payload)
    },
    getTask: (taskID, token) => {
        return supertest(url)
            .get(`/tasks/${taskID}`)
            .set('Authorization', `Bearer ${token}`)
            .send()
    },
    deleteTask: (taskID, token) => {
        return supertest(url)
            .delete(`/tasks/${taskID}`)
            .set('Authorization', `Bearer ${token}`)
            .send()
    }
}
