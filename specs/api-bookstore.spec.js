import axios from "axios";
import { describe, test, expect } from "@jest/globals";

const domain = 'https://bookstore.demoqa.com';

describe('API tests for Book Store', () => {
    test('Creating a user with existing username', async () => {
        const config = {
            method: 'post',
            url: `${domain}/Account/v1/User`,
            data: {
                userName: "test_username",
                password: "test_userName!555"
            }
        }
        try {
            await axios(config);
        }
        catch (e) {
            expect(e.response.status).toBe(406);
            expect(e.response.data.message).toBe('User exists!');
        }
    })
    test('Creating a user with wrong password', async () => {
        const config = {
            method: 'post',
            url: `${domain}/Account/v1/User`,
            data: {
                userName: "test_username1",
                password: "test_userName!"
            }
        }
        try {
            await axios(config);
        }
        catch (e) {
            expect(e.response.data.message)
            .toBe('Passwords must have at least one non alphanumeric character, one digit (\'0\'-\'9\'), one uppercase (\'A\'-\'Z\'), one lowercase (\'a\'-\'z\'), one special character and Password must be eight characters or longer.');
            expect(e.response.data.code).toBe('1300');
            expect(e.response.status).toBe(400);
        }
    })
    test('Creating a user with correct data', async () => {
        const config = {
            method: 'post',
            url: `${domain}/Account/v1/User`,
            data: {
                userName: 'test_username8',
                password: "test_userName!5"
            }
        }
        const response = await axios(config);
        expect(response.status).toBe(201);
        expect(response.data.username).toBe('test_username8');

    })
    test('Generate token', async() => {
        const config = {
            method: 'post',
            url: `${domain}/Account/v1/GenerateToken`,
            data: {
                userName: "test_username",
                password: "test_userName!555"
            }
        }
        const response = await axios(config);
        expect(response.status).toBe(200);
        expect(response.data.result).toBe('User authorized successfully.');
        expect(typeof response.data.token).toBe('string');
    })
    test("Error during generating token", async () => {
        const config = {
            method: "post",
            url: `${domain}/Account/v1/GenerateToken`,
            data: {
                userName: "test_username",
                password: "test_userName!=555"
            }
        }
        const response = await axios(config);
        expect(response.data.status).toBe('Failed');
        expect(response.data.token).toBeNull();
        expect(response.data.result).toBe('User authorization failed.');
    })
})
