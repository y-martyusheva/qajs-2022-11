import userName from "./fixtures.js";

const config = {
    url: 'https://bookstore.demoqa.com',
    wrongToken: '8sogjNIn0d6SHIDWK2r0hEzB3U57oQU6',
    existingUserCredentials: {
        userName: 'test_username',
        password: 'test_userName!555'
    },
    wrongCredentials: {
        userName: 'test_username',
        password: 'test_userName!'
    },
    noAuthCredentials: {
        "userName": 'test_username555',
        "password": 'test_userName!555'
    },
    newUserCredentials: {
        userName: userName,
        password: 'test_userName!555'
    }
}

export default config;
