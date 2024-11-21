const loginPage = require('../pageobjects/login.page');
const otpPage = require('../pageobjects/otp.page');
import headspinPage from '../pageobjects/headspin.page';
const axios = require('axios');
require('dotenv').config();
const { $ } = require('@wdio/globals');
const { remote } = require('webdriverio');

describe('Login Test with OTP', () => {
    let browser;

    before(async () => {
        // Initialize local browser
        browser = await remote({
            capabilities: {
                browserName: 'chrome',
            },
        });

    });

    after(async () => {
        // End both sessions after tests
        await browser.deleteSession();
        // await headspinBrowser.deleteSession();
    });

    it('should login and validate OTP', async () => {
        // Navigate to Login Page and perform login
        await loginPage.open();
        await loginPage.login('Muhammed.oyewumi@mtn.com', 'CHudyGabriel@20');        
        // Retrieve OTP from HeadSpin
        const otp = await headspinPage.getOtp(); // Capture returned OTP

        // Switch back to local browser and enter the OTP
        await browser.switchToWindow((await browser.getWindowHandles())[0]);
        await otpPage.enterOTP(otp);
    });
});
