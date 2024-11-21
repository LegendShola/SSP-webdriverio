const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    
    get emailInput() { 
        return $('#email');
    }
    get passwordInput() { 
        return $('#password');
    }
    get rememberMe() {
        return $("span[class='flex'] input[name='RememberMe']");
    }
    get termsOfUse() {
        return $("div[class='flex mt-[1rem] ml-[5px]'] input[name='RememberMe']");
    }
    get submitButton() { 
        return $("button[class='mt-3 w-full rounded-3xl bg-black py-2 font-medium text-white disabled:cursor-not-allowed disabled:bg-opacity-40']");
    }
  
    async login(email, password) {
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
        await this.rememberMe.click();
        await this.termsOfUse.click();
        await this.submitButton.click();
    }

    open () {
        return super.open('login');
    }
}

module.exports = new LoginPage();
