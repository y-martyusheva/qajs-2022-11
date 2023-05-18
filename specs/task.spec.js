import {task, user} from '../framework/vikunja.services.js';
import { describe, test, expect, beforeAll } from "@jest/globals";
import vikunjaConfig from '../framework/vikunja.config.js';

let token = '';
let taskID = '';

beforeAll(async () => {
    token = await user.getToken();
})

describe('Test try.vikunja.io', ()=> {
    describe.skip('PUT /lists/{id}', () => {
        beforeEach(()=> {
            reporter.addEnvironment('URL', vikunjaConfig.url)
        })

        test('Creating a task successfully', async () => {
            reporter.feature('User can create a task');
            reporter.story('Create a task111');
            reporter.description('Test description');


            const res = await task.createTask(token, vikunjaConfig.newTask);
            taskID = res.body.id;

            expect(res.body).toBe(201);
            expect(res.body.title).toBe(vikunjaConfig.newTask.title);
            expect(res.body.description).toBe(vikunjaConfig.newTask.description);
        })
        test('Creating a task with wrong token', async () => {
            reporter.feature('User can create a task');
            reporter.story('Create a task222');

            const res = await task.createTask(vikunjaConfig.wrongToken, vikunjaConfig.newTask);

            expect(res.status).toBe(401);
            expect(res.body.message).toBe('invalid or expired jwt');
        })
    })
    describe('POST /tasks/{id}', () => {

        test('Updating a task with incorrect taskID', async () => {
            reporter.story('User cannot update a task with incorrect taskID');
            reporter.feature('Update a task');

            const res = await task.updateTask(vikunjaConfig.incorrectTaskID, token, vikunjaConfig.updatedTask);

            expect(res.status).toBe(400)
            expect(res.body.message).toBe('Invalid model provided. Error was: strconv.ParseInt: parsing \"ID\": invalid syntax');
        })
        test('Updating a task with invalid token', async () => {
            reporter.story('User cannot update a task with invalid token');
            reporter.feature('Update a task');

            const res = await task.updateTask(taskID, vikunjaConfig.wrongToken, vikunjaConfig.updatedTask);

            expect(res.status).toBe(401)
            expect(res.body.message).toBe('invalid or expired jwt');
        })
        test('Updating a task successfully', async () => {
            const res = await task.updateTask(taskID, token, vikunjaConfig.updatedTask);

            expect(res.status).toBe(200);
            expect(res.body.id).toBe(taskID);
            expect(res.body.is_favorite).toBe(true);
            expect(res.body.done).toBe(true);
        })
    })
    describe('GET /tasks/{ID}', () => {
        test('Get a task successfully', async () => {
            const res = await task.getTask(taskID, token);

            expect(res.status).toBe(200);
            expect(res.body.id).toBe(taskID);
            expect(res.body.title).toBe(vikunjaConfig.newTask.title);
        })
        test('Get a task with invalid token', async () => {
            const res = await task.getTask(taskID, vikunjaConfig.wrongToken);

            expect(res.status).toBe(401);
            expect(res.body.message).toBe('invalid or expired jwt');
        })
    })
    describe('DELETE /tasks/{id}', () => {
        test('Deleting a task with incorrect taskID', async () => {
            const res = await task.deleteTask(vikunjaConfig.incorrectTaskID, token);

            expect(res.status).toBe(400)
            expect(res.body.message).toBe('Invalid model provided. Error was: strconv.ParseInt: parsing \"ID\": invalid syntax');
        })
        test('Deleting a task with invalid token', async () => {
            const res = await task.deleteTask(taskID, vikunjaConfig.wrongToken);

            expect(res.status).toBe(401)
            expect(res.body.message).toBe('invalid or expired jwt');
        })
        test('Deleting a task successfully', async () => {
            const res = await task.deleteTask(taskID, token);

            expect(res.status).toBe(200);
            expect(res.body.message).toBe('Successfully deleted');
        })
    })
})

