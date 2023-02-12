const vikunjaConfig = {
    url: 'https://try.vikunja.io/api/v1',
    credentials: {
        username: 'demo',
        password: 'demo',
        long_token: true
    },
    newTask: {
        title: 'The first task',
        description: 'Test creating a task',
        done: false
    },
    updatedTask: {
        done: true,
        is_favorite: true
    },
    wrongToken: '2ms1jKmgoFmOqStODZR4yMSrr1rIln7n',
    incorrectTaskID: 'ID'
}

export default vikunjaConfig;
