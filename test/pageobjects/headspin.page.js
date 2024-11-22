const { $ } = require('@wdio/globals')
const { remote } = require('webdriverio');

let headspinBrowser;

before(async () => {
    // Initialize HeadSpin device session
    headspinBrowser = await remote({
        protocol: 'https',
        hostname: 'mtn-ng-los-0.headspin.io',
        port: 7016,
        path: '/v0/a780428c6ff048ea9f48c0d308e07df4/wd/hub',
        capabilities: {
            platformName: 'Android',
            'appium:deviceName': 'samsung SM-A336E',
            'appium:udid': 'RFCW212MZKE',
            'appium:automationName': 'UiAutomator2',
            'appium:noReset': true,
            'appium:appPackage': 'com.google.android.apps.messaging',
            'appium:appActivity': 'com.google.android.apps.messaging.ui.ConversationListActivity',
            'headspin:controlLock': true,
        },
    });
});

class HeadspinPage {

    get conversationName() {
        return headspinBrowser.$('//android.widget.TextView[@resource-id="com.google.android.apps.messaging:id/conversation_name" and @text="MTN N"]');
    }
    get overflowMenuButton() {
        return headspinBrowser.$('//android.widget.ImageView[@content-desc="More conversation options"]');
    }
    
    get deleteButton() {
        return headspinBrowser.$('//android.widget.TextView[@resource-id="com.google.android.apps.messaging:id/title" and @text="Delete"]');
    }
    
    get confirmButton() {
        return headspinBrowser.$('//android.widget.Button[@resource-id="android:id/button1"]');
    }

    async getOtp() {
        // Switch focus to HeadSpin device to retrieve OTP
        await headspinBrowser.pause(10000); // Allow time for SMS arrival
        const otpMessage = await headspinBrowser.$(
            "//android.widget.TextView[@resource-id='com.google.android.apps.messaging:id/conversation_snippet' and contains(@text, 'Your SSP login token is')]"
        );
        await otpMessage.waitForExist({ timeout: 120000 }); // Timeout in milliseconds (2 minutes)
        const otpText = await otpMessage.getText();
        const otp = otpText.match(/\d{4,6}/)[0]; // Extract OTP (4-6 digits)
        console.log(`OTP Code: ${otp}`);
        return otp;
    }

    async deleteOtps() {
        await this.conversationName.click();
        await this.overflowMenuButton.click();
        await this.deleteButton.click();
        await this.confirmButton.click();
    }
}

module.exports = new HeadspinPage();

after(async () => {
    const headspinPage = new HeadspinPage();
    await headspinPage.deleteOtps();
    await headspinBrowser.deleteSession();
});
