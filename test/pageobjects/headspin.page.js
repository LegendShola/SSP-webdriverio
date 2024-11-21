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
            },
        });
    });


class HeadspinPage {  
    async getOtp() {


      // Switch focus to HeadSpin device to retrieve OTP
      await headspinBrowser.pause(10000); // Allow time for SMS arrival
      const otpMessage = await headspinBrowser.$(
          "//android.widget.TextView[@resource-id='com.google.android.apps.messaging:id/conversation_snippet' and contains(@text, 'Your SSP login token is')]"
      );
      const otpText = await otpMessage.getText();
      const otp = otpText.match(/\d{4,6}/)[0]; // Extract OTP (4-6 digits)
      console.log(`OTP Code: ${otp}`);
      return otp;

    }
  }
  
  module.exports = new HeadspinPage();

  
