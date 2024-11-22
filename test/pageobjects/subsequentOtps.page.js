const { $ } = require('@wdio/globals')

class subsequentOtpsPage {

    get auditTrailButton() {
        return $('span=Audit Trail');
    }
    get otpLogsButton() { 
        return $("//span[normalize-space()='OTP Logs']");
    }
    get searchField() {
        return $("//input[@id='search']")
    }
    get searchButton() { 
        return $("//button[normalize-space()='Search']");
    }
    get otpCell() {
        return $("(//td)[2]");
    }


    async extractOtp() {
        // Get the text content of the OTP element
        const otpText = await this.otpCell.getText();
    
        // Define the regex pattern to match a 6-digit OTP
        const otpPattern = /\b\d{6}\b/;
    
        // Use regex to find the 6-digit OTP in the text
        const match = otpText.match(otpPattern);
    
        // Store the OTP if found, otherwise throw an error
        if (match && match[0]) {
            const otp = match[0];
            console.log(`OTP Code: ${otp}`);
            return otp; // Return OTP as a string
        } else {
            throw new Error('Failed to extract OTP from the text.');
        }
    }

    async getOtp(msisdn) {
        // Switch to backoffice
        await browser.switchToWindow((await browser.getWindowHandles())[0]);
        await this.auditTrailButton.click();
        await this.otpLogsButton.click();
        await this.searchField.setValue(msisdn);
        await this.searchButton.click();
        await browser.pause(3000);
        return await this.extractOtp();
    }
    
  }
  
  module.exports = new subsequentOtpsPage();