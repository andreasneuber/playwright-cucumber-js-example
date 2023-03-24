const {Given, When, Then} = require('@cucumber/cucumber')
const {expect} = require("@playwright/test");

const {LoginPage} = require('../pageObjects/loginPage.js');
const {UserAccountPage} = require('../pageObjects/userAccountPage.js');
const {EmployeePage} = require('../pageObjects/employeePage.js');
const {SalesPage} = require("../pageObjects/salesPage");


Given('I navigate to login page', async function () {
    const loginPage = new LoginPage(page);
    await loginPage.visit();
});
When('I submit username {string} and password {string}', async function (username, password) {
    const loginPage = new LoginPage(page);
    await loginPage.provideUsername(username);
    await loginPage.providePassword(password);
    await loginPage.clickLogin();
});
Then('I will be logged into the Admin Dashboard', async function () {
    const userAccountPage = new UserAccountPage(page);
    await expect(userAccountPage.getAdminDashboardMainHeader()).toBeTruthy();

});
When('Admin searches for employee {string}', async function (employeeName) {
    const userAccountPage = new UserAccountPage(page);
    await userAccountPage.navigateToHumanResourcesSection();

    const employeePage = new EmployeePage(page);
    await employeePage.employeePageIsDisplayed();
    await employeePage.fillEmployeeNameInput(employeeName);
    await employeePage.clickSearchBtn();
});
Then('information appears that employee {string} belongs to department {string}',
    async function (expectedEmployeeName, expectedDepartmentName) {
        const employeePage = new EmployeePage(page);
        await employeePage.employeeRecordIsDisplayed();

        const actualEmployeeName = await employeePage.grabEmployeeName();
        expect(actualEmployeeName).toEqual(expectedEmployeeName);

        const actualDepartmentName = await employeePage.grabDepartmentName();
        expect(actualDepartmentName).toEqual(expectedDepartmentName);
    });
When('Admin looks up total sales amount for month {string} in year {string}', async function (month, year) {
    const userAccountPage = new UserAccountPage(page);
    await userAccountPage.navigateToSalesSection();

    const salesPage = new SalesPage(page);
    await salesPage.salesStatisticsPageIsDisplayed();

    const actualYearMonthHeader = await salesPage.grabYearMonthHeader();
    expect(actualYearMonthHeader).toEqual(year + ' Month');

    await salesPage.monthCellIsDisplayed(month);
});
Then('the total {string} sales amount is {string}', async function (month, expectedSalesAmount) {
    const salesPage = new SalesPage(page);
    const actualSalesAmount = await salesPage.grabSalesAmountFromMonth(month);
    expect(actualSalesAmount).toEqual(expectedSalesAmount);
});