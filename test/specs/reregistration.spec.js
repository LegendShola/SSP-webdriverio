const loginPage = require('../pageobjects/sspLogin.page');
const loginPageBO = require('../pageobjects/backOfficeLogin.page');
const otpPage = require('../pageobjects/subsequentOtps.page');
import headspinPage from '../pageobjects/headspin.page';
const axios = require('axios');
require('dotenv').config();
const { $ } = require('@wdio/globals');
const { remote } = require('webdriverio');
const data = require('../testData.json');


describe('Login Test with OTP', () => {

    after(async () => {
        // End browser session after tests
        await browser.deleteSession();
    });

    // Test credentials from fixture data
    const email = data.email;
    const password = data.password;
    const msisdn = data.msisdn;

    it('Verify user can log in to the back office platform', async () => {
        // Navigate to Login Page and perform login
        await loginPageBO.open();
        await loginPageBO.login(email, password);        
        
    });

    it('Verify user can enter extracted otp to complete back office log in', async () => {

        // Retrieve OTP from HeadSpin
        const otp = await headspinPage.getOtp(); // Capture returned OTP
        
        // Switch back to local browser and enter the OTP
        await browser.switchToWindow((await browser.getWindowHandles())[0]);
        await loginPageBO.enterOTP(otp);
    });

    it('Verify user can log in to the SSP platform', async () => {

        // Log in to the SSP platform
        await browser.execute(() => window.open()); // Open a new tab
        const tabs = await browser.getWindowHandles(); // Get all open window handles
        await browser.switchToWindow(tabs[1]); // Switch to the newly opened tab
        await browser.url(data.sspUrl); // Navigate to the SSP URL

        // Perform login
        await loginPage.login(email, password);

    });

    it('Verify user can extract Otp from otp logs to complete ssp log in', async () => {

        // Retrieve OTP from Backoffice
        const otp = await otpPage.getOtp(msisdn);
        
        // Switch back to local browser and enter the OTP
        await browser.switchToWindow((await browser.getWindowHandles())[1]);
        console.log(`Extracted OTP: ${otp}`);
        await loginPage.enterOTP(otp);
    });
});
