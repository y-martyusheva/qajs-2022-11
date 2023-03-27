import bookstoreConfig from "../framework/bookstore.config.js";
import {user} from "../framework/bookstore.services.js";
import { describe, test, expect } from "@jest/globals";

let existingUserId = '';
let token = '';

describe('Account', () => {
    describe('POST /Account/v1/User', () => {
        test('Сreating a new user', async () => {
            const res = await user.createUser(bookstoreConfig.newUserCredentials);

            expect(res.status).toBe(201);
            expect(typeof res.body.userID).toBe('string');
            existingUserId = res.body.userID;
            console.log(res.body.username, existingUserId);
        })
        test('Сreating a user with wrong password', async () => {
            const res = await user.createUser(bookstoreConfig.wrongCredentials);

            expect(res.status).toBe(400);
            expect(res.body.code).toBe('1300');
            expect(res.body.message)
            .toBe('Passwords must have at least one non alphanumeric character, one digit (\'0\'-\'9\'), one uppercase (\'A\'-\'Z\'), one lowercase (\'a\'-\'z\'), one special character and Password must be eight characters or longer.');
        })
        test('Creating existing user', async () => {
            const res = await user.createUser(bookstoreConfig.existingUserCredentials);

            expect(res.status).toBe(406);
            expect(res.body.code).toBe('1204');
            expect(res.body.message).toBe('User exists!')
        })
    })
    describe('POST /Account/v1/GenerateToken', () => {
        test('Token generation for existing user', async () => {
            const res = await user.token(bookstoreConfig.newUserCredentials);
            token = res.body.token;

            expect(res.status).toBe(200);
            expect(typeof res.body.token).toBe('string');
            expect(res.body.result).toBe('User authorized successfully.');
            console.log(token)
        })
        test('Token generation with wrong credentials', async ()=> {
            const res = await user.token(bookstoreConfig.wrongCredentials);

            expect(res.status).toBe(200);
            expect(res.body.token).toBeNull();
            expect(res.body.result).toBe('User authorization failed.');
        })
    })
    describe('POST /Account/v1/Authorized', () => {
        test('Successful authorization', async () => {
            const res = await user.authorization(bookstoreConfig.newUserCredentials, token);

            expect(res.status).toBe(200);
            expect(res.body).toBeTruthy();
        })
        test('Authorization for non-existent user', async () => {
            const res = await user.authorization(bookstoreConfig.wrongCredentials);

            expect(res.status).toBe(404)
            expect(res.body.code).toBe('1207');
            expect(res.body.message).toBe('User not found!');
        })
        test('Authorization is false', async () => {
            const res = await user.authorization(bookstoreConfig.noAuthCredentials);

            expect(res.status).toBe(200);
            expect(res.body).toBeFalsy();
        })
    })
    describe('GET /Account/v1/User/{UUID}', () => {
        test('Getting user information successfully', async () => {
            const res = await user.getUserInfo(existingUserId, token);

            expect(res.status).toBe(200);
            expect(res.body.userId).toBe(existingUserId);
            expect(res.body.username).toBe(bookstoreConfig.newUserCredentials.userName);
            console.log(res.body.username);
            console.log(res.body.userId);
        })
        test('Getting user information with wrong credentials', async () => {
            const res = await user.getUserInfo(bookstoreConfig.wrongCredentials, token);

            expect(res.status).toBe(401);
            expect(res.body.message).toBe('User not found!');
        })
    })
    describe('DELETE /Account/v1/User/{UUID}', () => {
        test.skip('Deleting user with wrong token', async () => {
            const res = await user.delete(existingUserId, bookstoreConfig.wrongToken);

            expect(res.status).toBe(401);
            expect(res.body.code).toBe('1200');
            expect(res.body.message).toBe('User not authorized!');
        })
        test.skip('Deleting user successfully', async () => {
            const res = await user.delete(existingUserId, token);

            expect(res.status).toBe(204);
        })
    })
})
