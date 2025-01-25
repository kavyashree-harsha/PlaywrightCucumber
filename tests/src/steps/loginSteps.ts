const {Given} = require("@cucumber/cucumber");
const {When} = require("@cucumber/cucumber");
const {Then} = require("@cucumber/cucumber");

const {Browser, Page, chromium, expect} = require("@playwright/test");
let browser;
let page;
let context;

Given('User navigates to the application', async function () {
    browser = await chromium.launch({headless:false});
    page = await browser.newPage();
    await page.goto("https://bookcart.azurewebsites.net/");
    await page.waitForSelector("//button[@mattooltip='Login']");

  });

  Given('User clicks on login link', async function () {
    await page.locator("//button[@mattooltip='Login']").click();
  });

  Given('User enters valid name as {string}', async function (validUserName) {
    await page.locator("#mat-mdc-form-field-label-0").fill(validUserName);
  });

  Given('Users enters valid password as {string}', async function (validPassword) {
    await page.locator("#mat-input-1").fill(validPassword);
  });

  When('User clicks on Login button', async function () {
    await page.locator("//span[text()='Login']").click();
  });

  Then('Login should be successful', async function () {
    await page.waitForSelector("//span[@class='mat-mdc-button-persistent-ripple mdc-button__ripple']/following::span[contains(text(),'ortoni')]");
    const userName = await page.locator("//span[@class='mat-mdc-button-persistent-ripple mdc-button__ripple']/following::span[contains(text(),'ortoni')]").isVisible();
    await expect(userName).toBe(true);
    await browser.close();
  });

  Given('User enters name as {string}', async function (invalidUserName) {
    await page.locator("#mat-mdc-form-field-label-0").fill(invalidUserName);
  });

  Given('Users enters password as {string}', async function (invalidPassword) {
    await page.locator("#mat-input-1").fill(invalidPassword);
  });

  Then('Login should fail', async function () {
    await page.waitForSelector("#mat-mdc-error-0");
    const errorMsg = await page.locator("#mat-mdc-error-0").isVisible();
    expect(errorMsg).toBe(true);
    await browser.close();
  });