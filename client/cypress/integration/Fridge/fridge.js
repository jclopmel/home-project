import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

const fridgeUrl = "http://localhost:8080/fridge"

// Scenario: Back to home
Given("User is at fridge url", ()=>{
	cy.visit(fridgeUrl)
})
When("User clicks on home button", ()=>{
	cy.get('#app').find('button#backHomeBtn').click()
})
Then("User navigates to home url", ()=>{
	cy.url().should("include", "/")
})

// Scenario: Change one product amount
Given("User is at fridge url", ()=>{
	cy.visit(fridgeUrl)
})
When("at least one product remains in storage", ()=>{

	cy.get('#app').find('.v-list-item').its('length')
		.then(($n2) => {

			if( expect($n2).to.be.greaterThan(0) ){

When("user clicks on first item", (buttons)=>{

					cy.get('#app').find('.v-list-item').first()
						.then(($item) => {

							const txt = $item.find(".v-list-item__subtitle").text()
							buttons.hashes().forEach(e => {
								$item.find(e.amountButton).click()
							})

							cy.wait(2000)
							.then(() => {

Then("text of first item changes", ()=>{
									expect($item.find(".v-list-item__subtitle").text()).not.to.eq(txt)
								})

							})
						})

				})

			}

		})

})

// Scenario: Add-product button is disabled when user enters incorrect values
Given("User is at fridge url", ()=>{
	cy.visit(fridgeUrl)
})

When("user enters at new-product form incorrect values", (data)=>{
	cy.get('#app').find('button#newProductForm').click()
	data.hashes().forEach(e => {
		cy.get('input#newName').type(e.name)
		cy.get('input#newQuantity').type(e.amount)
	})
})

Then("add-product button is disabled", ()=>{
	cy.get('#app').find('button#addProductBtn').should('be.disabled')
})



// Scenario: Adding new products changes product list length
Given("User is at fridge url", ()=>{
	cy.visit(fridgeUrl)
})

When("user enters at new-product form values", (data)=>{
	cy.get('#app').find('.v-list-item').its('length')
		.then(($n1) => {
			const nElements = $n1;
			cy.get('#app').find('button#newProductForm').click()
			data.hashes().forEach(e => {
				cy.get('input#newName').clear()
				cy.get('input#newName').type(e.name)
				cy.get('input#newQuantity').clear()
				cy.get('input#newQuantity').type(e.amount)
				cy.get('.v-select__slot').click({force: true})
				cy.get('.v-menu__content [role="option"]').eq(e.icon).click()
			})
			
When("user clicks on add-product button", (data)=>{
				cy.get('#app').find('button#addProductBtn').click()

				cy.wait(2000)
				.then(() => {
					cy.get('#app').find('.v-list-item').its('length')
					.then(($n2) => {

Then("products list length changes", ()=>{
						expect($n2).to.be.greaterThan(nElements)
})
					})
				})
})

			

		})
})

// Scenario: Deleting products changes product list length
Given("User is at fridge url", ()=>{
	cy.visit(fridgeUrl)
})
When("at least one product in storage", ()=>{
	cy.get('#app').find('.v-list-item').its('length')
	.then(($n1) => {

		const nElements = $n1;
		if( expect(nElements).to.be.greaterThan(0) ){
		
When("user clicks on vertical-dots button", ()=>{
			cy.get('#app').find('.v-list-item').last()
			.then(($item) => {
				$item.find(".productOptionsBtn").click()

When("user clicks on delete button", ()=>{
				cy.get('#app').find(".deleteBtn").click()

				cy.wait(2000)
				.then(() => {

					cy.get('#app').find('.v-list-item').its('length')
					.then(($n2) => {

Then("products list length decreases", ()=>{
					expect( nElements ).to.be.lessThan( $n2 )
})

					})

				})
})
			})
})
		}
	})
})

Given("user is at not-home url", ()=>{
	cy.visit(fridgeUrl)
})
When("user clicks on", (buttons)=>{
	buttons.hashes().forEach(e => {
		cy.get('#app').find('.v-bottom-navigation').find(e.nav).click()
	})
})
Then("user navigates to", (urls)=>{
	urls.hashes().forEach(e => {
		cy.url().should("include", e.url)
	})
})

