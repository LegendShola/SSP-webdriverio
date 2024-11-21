class OTPPage {

    get otpInput() { return $(('(//input[contains(@type,"text")])[7]')); }
    get verifyOTPButton() { return $(('(//button[normalize-space()="Verify"])[2]')); }
  
    async enterOTP(otp) {
      await this.otpInput.setValue(otp);
      await this.verifyOTPButton.click();
    }
  }
  
  module.exports = new OTPPage();
  