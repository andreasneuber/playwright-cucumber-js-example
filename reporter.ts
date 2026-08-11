// eslint-disable-next-line @typescript-eslint/no-var-requires
const reporter = require('multiple-cucumber-html-reporter');

reporter.generate({
    jsonDir: '.',
    reportPath: 'reports',
    reportName: 'Cucumber Test Report',
    pageTitle: 'Cucumber Test Report',
    metadata: [
        { name: 'App Version', value: '1.0.0' },
        { name: 'Test Environment', value: 'STAGING' },
        { name: 'Browser', value: 'Chrome 110.0' },
        { name: 'Platform', value: 'Windows 10' },
    ],
});
