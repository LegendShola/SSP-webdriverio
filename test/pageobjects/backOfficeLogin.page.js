const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    
    get emailInput() { 
        return $("input[name='Login email Address']");
    }
    get passwordInput() { 
        return $("//input[@name='Login password']");
    }
    get policyAgreement() {
        return $("//input[@name='policy agreement']")
    }
    get continueButton() { 
        return $("//button[normalize-space()='Continue']");
    }
    get otpInput() {
        return $("//input[contains(@type,'text')]");
    }
    get verifyOTPButton() { 
        return $("//button[normalize-space()='Verify']"); 
    }
  
    async enterOTP(otp) {
        await this.otpInput.setValue(otp);
        await this.verifyOTPButton.click();
        await browser.pause(10000);
    }
  

    async login(email, password) {
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
        await this.policyAgreement.click();
        await this.continueButton.click();
        await browser.pause(5000);
    }

    open () {
        return super.open('login');
    }
}

module.exports = new LoginPage();
