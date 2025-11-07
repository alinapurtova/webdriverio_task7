import SignUpPage from '../pageobjects/signup.page.js';
import HomePage from '../pageobjects/home.page.js';

describe('SignUp Page tests', () => {

  it('TC-005: Verify that the Sign Up page opens correctly', async () => {
    await HomePage.open();
    await HomePage.navigateToSignUp();
    await SignUpPage.isOnPage();
    await SignUpPage.verifyFormLoaded();
    await expect($(SignUpPage.signUpButton)).toBeDisplayed();
  });

  it('TC-006: Verify Sign Up form validation with empty submit', async () => {
    await SignUpPage.openPage();
    await SignUpPage.isOnPage();
    await expect($(SignUpPage.signUpButton)).toBeDisplayed();
    await SignUpPage.submitEmptyForm();
    await SignUpPage.verifyErrorMessages();
  });

  it('TC-007: Verify promocode field appears on the Sign Up page', async () => {
    await SignUpPage.openPage();
    await expect(await browser.getUrl()).toContain(SignUpPage.url);
    await SignUpPage.verifyFormIsVisible();
    await SignUpPage.verifyPromoLinkVisible();
    await SignUpPage.verifyPromoFieldNotVisible();
    await SignUpPage.clickPromoLink();
    await SignUpPage.verifyPromoFieldAppears();
  });
});