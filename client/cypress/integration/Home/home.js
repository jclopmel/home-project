import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

const homeUrl = "http://localhost:8080/"

Given("User is at home url", ()=>{
	cy.visit(homeUrl)
})
When("User checks four buttons", ()=>{
	cy.get('#app').find('button')
})
Then("User finds four buttons", ()=>{
	cy.get('#app').find('button').should('have.length', 4)
})

Given("User is at home url", ()=>{
	cy.visit(homeUrl)
})
When("User clicks on", (buttons)=>{
	buttons.hashes().forEach(e => {
		cy.get('#app').find('button').eq(e.mainButtons).click()
	})
})
Then("Url should include", (urls)=>{
	urls.hashes().forEach(e => {
		cy.url().should("include", e.mainUrl)
	})
})

