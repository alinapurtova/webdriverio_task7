import Page from './page.js';

class LoginPage extends Page {
    url = 'portal.telnyx.com';
    loginForm = "section.MuiBox-root";
    emailInput = 'input[name="email"]';
    passwordInput = 'input[name="password"]';
    loginButton = 'button[type="submit"]';

    async isOnPage() {
        await this.isUrlContains(this.url);
    }

    async verifyLoginFieldsVisible() {
        await this.isVisible(this.emailInput);
        await this.isVisible(this.passwordInput);
        await this.isVisible(this.loginButton);
    }
}

export default new LoginPage();