exports.config = {
   
    runner: 'local',
    //
    specs: [
        './test/specs/**/*.js'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    maxInstances: 1,
  
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--window-size=1900,1100', '--disable-infobars'],
        },
        // ignoreSynchronization: true,
        acceptInsecureCerts: true,
    }],
 
    logLevel: 'info',
   
    waitforTimeout: 10000,


    connectionRetryTimeout: 120000,
 
    connectionRetryCount: 3,
    services: ['gmail', 'appium', 'reportportal'],

    framework: 'mocha',
    
    reporters: ['junit', ['allure', {outputDir: 'allure-results'}]],

    
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    },


    }
