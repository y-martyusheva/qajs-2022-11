import { expect, test } from '@playwright/test';

const selectors = {
    username: '[data-test="username"]',
    password: '[data-test="password"]',
    loginButton: '[data-test="login-button"]',
    errorMessage: '[data-test="error"]'
}

const credentials = {
    successLogin: 'standard_user',
    blockedUserLogin: 'locked_out_user',
    nonExistentUserLogin: 'test-user',
    password: 'secret_sauce',
    wrongPassword: '555'
}

test.describe('Login', ()=> {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
    });
    test('Successful authorization with correct data', async ( {page}) => {
        await page.locator(selectors.username).fill(credentials.successLogin);
        await page.locator(selectors.password).fill(credentials.password);
        await page.locator(selectors.loginButton).click();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page).toHaveTitle('Swag Labs');
        })
    test('Failed authorization with wrong password', async ({page}) => {
        await page.locator(selectors.username).fill(credentials.successLogin);
        await page.locator(selectors.password).fill(credentials.wrongPassword);
        await page.locator(selectors.loginButton).click();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator(selectors.errorMessage)).toBeVisible();
        await expect(page.locator(selectors.errorMessage))
            .toContainText('Epic sadface: Username and password do not match any user in this service');
    })
    test('Failed authorization for blocked user', async ({page}) => {
        await page.locator(selectors.username).fill(credentials.blockedUserLogin);
        await page.locator(selectors.password).fill(credentials.password);
        await page.locator(selectors.loginButton).click();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator(selectors.errorMessage)).toBeVisible();
        await expect(page.locator(selectors.errorMessage))
            .toHaveText('Epic sadface: Sorry, this user has been locked out.');
    })
    test('Failed authorization with empty password', async ({page}) => {
        await page.locator(selectors.username).fill(credentials.successLogin);
        await page.locator(selectors.loginButton).click();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator(selectors.errorMessage)).toBeVisible();
        await expect(page.locator(selectors.errorMessage))
            .toHaveText('Epic sadface: Password is required');
    })
    test('Failed authorization with empty username', async ({page}) => {
        await page.locator(selectors.password).fill(credentials.password);
        await page.locator(selectors.loginButton).click();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator(selectors.errorMessage)).toBeVisible();
        await expect(page.locator(selectors.errorMessage))
            .toHaveText('Epic sadface: Username is required');
    })
})
