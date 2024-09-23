describe("Check that the 'Add New Doctor' form doesn't save with an empty data", () => {

    beforeEach(async () => {
        await browser.url("https://ej2.syncfusion.com/showcase/angular/appointmentplanner/#/dashboard");
    });

    it("Verify that an error message displayed if the 'Doctor Name' field in the 'Add New Doctor' form don't filled out", async() => {
        await $("div.doctors").click();
        await $("//button[text()='Add New Doctor']").click();
        await $("//button[text()='Save']").click();
        const nameError = await $("label#Name-info");

        expect(await nameError.getText()).toEqual("Enter valid name");
    });

    it("Verify that an error message displayed if the 'Email' field in the 'Add New Doctor' form don't filled out", async() => {
        await $("div.doctors").click();
        await $("//button[text()='Add New Doctor']").click();
        await $("input[name='Name']").setValue("John Doe");
        await $("//button[text()='Save']").click();
        const emailError = await $("label#Email-info");

        expect(await emailError.getText()).toEqual("Enter valid email");
    });

    it("Verify that an error message displayed if the 'Mobile Number' field in the 'Add New Doctor' form don't filled out", async() =>{
        await $("div.doctors").click();
        await $("//button[text()='Add New Doctor']").click();
        await $("input[name='Name']").setValue("John Doe");
        await $("//button[text()='Save']").click();
        const mobileNumberError = await $("label#undefined-info");

        expect(await mobileNumberError.getText()).toEqual("Enter valid mobile number");
    });

    it("Verify that an error message displayed if the 'Education' field in the 'Add New Doctor' form don't filled out", async() =>{
        await $("div.doctors").click();
        await $("//button[text()='Add New Doctor']").click();
        await $("input[name=Name]").setValue("John Doe");
        await $("//button[text()='Save']").click();
        const educationError = await $("label#Education-info");

        expect(await educationError.getText()).toEqual("Enter valid education");

    });
});


describe("Verify Homepage Elements", () => {
   
    beforeEach(async () => {
        await browser.url("https://www.epam.com/");
    });

    it("Assert that the page title is correct", async () => {
        const pageTitle = await browser.getTitle();
        expect(pageTitle).toEqual("EPAM | Software Engineering & Product Development Services");
    })

    it("Verify that the logo on the homepage is visible", async () => {
        const logo = await $("//a[@class='header__logo-link']");
        const isLogoDisplayed = await logo.isDisplayed();
        expect(isLogoDisplayed).toBe(true);
    });
    

    it("Verify that the menu button on the homepage is visible", async () => {
        const menu = await $("div.hamburger-menu-ui");
        const isMenuDisplayed = await menu.isDisplayed();
        expect(isMenuDisplayed).toBe(true);
    });

    it("Verify that the change mode button on the homepage is visible", async () => {
        const mode = await $("div.theme-switcher");
        const isModeDisplayed = await mode.isDisplayed();
        expect(isModeDisplayed).toBe(true);
    });

    it("Verify that the navigation menu on the homepage is visible", async () =>{
        const nav = await $("//ul[contains(@class, 'top-navigation__row')]");
        const isNavDisplayed = await nav.isDisplayed();
        expect(isNavDisplayed).toBe(false);
    });

    it("Verify that the 'Contact Us' button on the homepage is visible", async () =>{
        const contact = await $("//a[@class='cta-button-ui cta-button-ui-23 header__control']");
        const isContactDisplayed = await contact.isDisplayed();
        expect(isContactDisplayed).toBe(true);
    });
     
    it("Verify that the location button on the homepage is visible", async () =>{
        const location = await $("//div[@class='mobile-location-selector__button-section']");
        const isLocationDisplayed = await location.isDisplayed();
        expect(isLocationDisplayed).toBe(true);
    });

    it("Verify that the search button on the homepage is visible", async () =>{
        const search = await $("//button[@class='header-search__button header__icon']");
        const isSearchDisplayed = await search.isDisplayed();
        expect(isSearchDisplayed).toBe(true);
    });
});

describe("Search Functionality Test", () => {

    beforeEach(async () => {
        await browser.url("https://www.epam.com/");   
     });

     it("Verify that the search is working correct with valid data", async () => {
        await $("button.header-search__button").click();
        await $("input[name='q']").setValue("Software Development");
        await $("//button[contains(@class, 'custom-button button-text font-900 gradient-border-button large-gradient-button uppercase-text custom-search-button')]").click();
        const resultsPage = await $("//article[@class='search-results__item']");
        await resultsPage.waitForDisplayed({ timeout: 10000 });
        expect(await resultsPage.isDisplayed()).toBe(true);

        const firstResult = await $("//article[@class='search-results__item']");
        const firstResultText = await firstResult.getText();
        expect(firstResultText.toLowerCase()).toContain("software development");

     });

     it("Verify that the search is working correct with invalid data", async () => {
        await $("button.header-search__button").click();
        await $("input[name='q']").setValue("Software Develipmint");
        await $("//button[contains(@class, 'custom-button button-text font-900 gradient-border-button large-gradient-button uppercase-text custom-search-button')]").click();
        const resultsPage = await $("//article[@class='search-results__item']");
        await resultsPage.waitForDisplayed({ timeout: 10000 });
        expect(await resultsPage.isDisplayed()).toBe(true);

        const firstResult = await $("//article[@class='search-results__item']");
        const firstResultText = await firstResult.getText();
        expect(firstResultText.toLowerCase()).toContain("software development");

     })

});

describe.only("Language Selector Test", () => {

    beforeEach(async () => {
        await browser.url("https://www.epam.com/");
    });

    
    it("Verify that the language selector is working properly", async () => {
        const cookieConsentButton = await $('button#onetrust-accept-btn-handler');
        if (await cookieConsentButton.isDisplayed()) {
            await cookieConsentButton.click();
        }
       const button = await $("button.hamburger-menu__button");
       await button.waitForClickable({ timeout: 5000 });
       const btnClick = await button.isClickable();
       console.log(btnClick);
      // await button.click();
       
    // await $("//span[@class='location-selector__button-language']").click();
    /*   const nav = await $("//nav[@class='location-selector__panel']");
       const navDispl = await nav.isDisplayed();
       expect(navDispl).toBe(true);
       /* const ukLang = $("//a[text() ='Україна ']");
        await ukLang.scrollIntoView();
        await ukLang.waitForClickable({ timeout: 5000 });
        await ukLang.click();

//nav[@class='location-selector__panel']


        const lang = await $("//button[text()='Україна (UA)']");
        expect(lang.isDisplayed()).toBe(true);
        */
  });
        
        
  
        
        
        
  
    

    
});

describe("4. Navigation Menu Links Test", () => {

    beforeEach(async () => {
        await browser.url("https://www.epam.com/");
    });

    it("Verify that the navigation menu links work as expected", async () => {
       const services = await $("//a[contains(@class, 'top-navigation__item-link js-op') and text() = 'Services']");
       const servicesPage = await services.isClickable();
       // const servicesUrl = await servicesPage.getUrl();
       console.log(servicesPage);
       //expect(servicesURL).toEqual("https://www.epam.com/services");

    })
})

describe("smth", () => {
    beforeEach(async () =>{
        await browser.url("https://rozetka.com.ua/ua/notebooks/c80004/preset=game/");
    });

    it("lala", async () =>{
        await $("//button[@class='button button--link sub-lg lang__button']").click();
        const list = await $("//div[@class='lang__menu ng-star-inserted']");
        const isListDis = await list.isDisplayed();
        expect(isListDis).toBe(true);

        await $("//button[text()=' RU ']").click();

        const lang = await $("html");
        const attr = await lang.getAttribute('lang');
        console.log(attr);
        expect(attr).toContain("ru");
    })
})
