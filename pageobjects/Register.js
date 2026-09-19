class Register {
    constructor(page) {
        this.page = page;
        this.loginLink = page.locator('[href="/login"]');
        this.nameInput = page.getByPlaceholder('Name');
        this.emailInput = page.getByPlaceholder('Email Address').nth(1);
        this.signupButton = page.getByRole('button', { name: 'Signup' });
        this.titleMr = page.getByLabel('Mr.');
        this.passwordInput = page.locator('#password');
        this.daysSelect = page.locator('#days');
        this.monthsSelect = page.locator('#months');
        this.yearsSelect = page.locator('#years');
        this.newsletterCheckbox = page.locator('[type="checkbox"]').first();
        this.offersCheckbox = page.locator('[type="checkbox"]').last();
        this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
        this.continueButton = page.locator('.btn').first();
        this.accountName = page.locator('li a b');
        this.deleteAccountLink = page.locator('[href="/delete_account"]');
    }

    async openSignupForm() {
        await this.loginLink.click();
    }

    async signup(name, email) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.signupButton.click();
    }

    async fillAccountDetails(details) {
        await this.titleMr.check();
        await this.passwordInput.fill(details.password);
        await this.daysSelect.selectOption(details.day);
        await this.monthsSelect.selectOption(details.month);
        await this.yearsSelect.selectOption(details.year);
        await this.newsletterCheckbox.check();
        await this.offersCheckbox.check();
        await this.page.locator('#first_name').fill(details.firstName);
        await this.page.locator('#last_name').fill(details.lastName);
        await this.page.locator('#address1').fill(details.address);
        await this.page.locator('#country').selectOption(details.country);
        await this.page.locator('#state').fill(details.state);
        await this.page.locator('#city').fill(details.city);
        await this.page.locator('#zipcode').fill(details.zipcode);
        await this.page.locator('#mobile_number').fill(details.mobileNumber);
    }

    async createAccount() {
        await this.createAccountButton.click();
    }

    async continue() {
        await this.continueButton.click();
    }

    async deleteAccount() {
        await this.deleteAccountLink.click();
    }
}

module.exports = { Register };