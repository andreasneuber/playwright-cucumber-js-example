const {expect} = require('@playwright/test');

exports.LoginPage = class LoginPage {

    url = '?action=form4';

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.inputUsername = page.locator('input[name="user"]');
        this.inputPassword = page.locator('input[name="pw"]');
        this.buttonLogin = page.locator('#btnLogin');
        this.titleHeader = page.locator('h2');
    }

    async visit() {
        await this.page.goto(BASE_URL + this.url);
    }

    async provideUsername(username) {
        await this.inputUsername.fill(username);
    }

    async providePassword(password) {
        await this.inputPassword.fill(password);
    }

    async login(username, password) {
        await this.provideUsername(username);
        await this.providePassword(password);
    }

    async clickLogin() {
        await this.buttonLogin.click();
    }

    async getTitleForm() {
        return await page.locator(this.titleHeader).textContent();
    }
}