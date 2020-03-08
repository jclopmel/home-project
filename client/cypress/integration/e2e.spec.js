/*
Feature: Home minimum configuration
 	Four main buttons must be displayed and accessible
*/
describe("Home functionality", ()=>{
	/*
	Scenario: Checking four buttons are displayed
		Given user is at index.html
		When user searches for buttons
		Then user gets 4 elements
	*/
	it("Checking correct elements number", ()=>{

		cy.visit("http://localhost:8080/")
		cy.get('#app').find('button').should('have.length', 4)
	})

	/*
	Scenario: Main buttons redirect correctly
		Given user is at index.html
		When user clicks on first button
		Then user access '/fridge' url
	*/
	it("Clicking on first button", ()=>{

		cy.visit("http://localhost:8080/")
		cy.get('#app').find('button').first().click()
		cy.url().should("include", "/fridge")
	})

})

/*
Feature: Fridge functionality
 	CRUD and navigation functions must work
*/

describe("Fridge functionality", ()=>{
	/*
	Scenario: Back to home
		Given user is at /fridge url
		When user clicks on home button
		Then user access index.html url
	*/
	it("Clicking on home button", ()=>{

		cy.visit("http://localhost:8080/fridge")
		cy.get('#app').find('button#backHomeBtn').click()
		cy.url().should("include", "/")
	})

	/*
	Scenario: Change product amount by one
		Given user is at /fridge url
		When user clicks on '<button>' button
		Then text of first element changes 

			| button 	|
			| .more 	|
			| .less 	|

	*/
	it("Add one to first product", ()=>{

		cy.visit("http://localhost:8080/fridge")
		cy.get('#app').find('.v-list-item').first()
		.then(($item) => {
			const txt = $item.find(".v-list-item__subtitle").text()
			$item.find("button.more").click()

			cy.wait(2000)
			.then(() => {
				expect($item.find(".v-list-item__subtitle").text()).not.to.eq(txt)
			})

		})

	})

	/*
	Scenario: Subtract one to first product
		Given user is at /fridge url
		When user clicks on .less button
		Then text of first element changes

	*/

	it("Subtract one to first product", ()=>{

		cy.visit("http://localhost:8080/fridge")
		cy.get('#app').find('.v-list-item').first()
		.then(($item) => {
			const txt = $item.find(".v-list-item__subtitle").text()
			$item.find("button.less").click()

			cy.wait(2000)
			.then(() => {
				expect($item.find(".v-list-item__subtitle").text()).not.to.eq(txt)
			})

		})

	})

	/*
	Scenario: Opening new product form
		Given user is at /fridge url
		When user clicks on shopping-cart button
		Then form dialog opens
	*/
	it("Opening new product form", ()=>{

		cy.visit("http://localhost:8080/fridge")
		cy.get('#app').find('button#newProductForm').click()
		cy.get('.v-dialog').should('be.visible') 

	})

	/*
	Scenario: Add-product button disabled when no values
		Given user is at /fridge url
		When user enters no values at the new product form
		Then add product button is disabled
	*/
	it("Add product button disabled when no values", ()=>{

		cy.visit("http://localhost:8080/fridge")
		cy.get('#app').find('button#newProductForm').click()
		cy.get('#app').find('button#addProductBtn').should('be.disabled')

	})

	/*
	Scenario: Add-product button disabled  when incorrect values
		Given user is at /fridge url
		When user enters incorrect values at the new product form
		Then add product button is disabled
	*/
	it("Add product button disabled  when incorrect values", ()=>{

		cy.visit("http://localhost:8080/fridge")
		cy.get('#app').find('button#newProductForm').click()

		cy.get('input#newQuantity').type("a")

		cy.get('#app').find('button#addProductBtn').should('be.disabled')

	})

	/*
	Scenario: Add-product button is enabled when correct values
		Given user is at /fridge url
		When user enters correct values at the new product form
		Then add product button is enabled
	*/
	it("Add product button is enabled when correct values", ()=>{

		cy.visit("http://localhost:8080/fridge")
		cy.get('#app').find('button#newProductForm').click()

		cy.get('input#newName').type('Water')
		cy.get('input#newQuantity').type(2)
		cy.get('.v-select__slot').click({force: true})
		cy.get('.v-menu__content [role="option"]').first().click()

		cy.get('#app').find('button#addProductBtn').should('be.enabled')

	})

	/*
	Scenario: Adding new products changes product list length
		Given user is at /fridge url
		When user enters correct values at the new product form
		And clicks on 'add' button
		Then products list length increases
	*/
	it("Adding new products changes product list length", ()=>{

		cy.visit("http://localhost:8080/fridge")
		cy.get('#app').find('.v-list-item').its('length')
		.then(($n1) => {

			cy.get('#app').find('button#newProductForm').click()
			cy.get('input#newName').type('Water')
			cy.get('input#newQuantity').type(2)
			cy.get('.v-select__slot').click({force: true})
			cy.get('.v-menu__content [role="option"]').first().click()

			cy.get('#app').find('button#addProductBtn').click()
			cy.wait(2000)
			.then(() => {
				cy.get('#app').find('.v-list-item').its('length')
				.then(($n2) => {
					expect($n2).to.be.greaterThan($n1)

				})
			})

		})

	})

	/*
	Scenario: Deleting products changes product list length
		Given user is at /fridge url
		When clicks on 'vertical-dots' button
		And clicks on 'delete' button
		Then products list length decreases
	*/
	it("Deleting products changes product list length", ()=>{

		cy.visit("http://localhost:8080/fridge")
		cy.get('#app').find('.v-list-item').its('length')
		.then(($n1) => {
			const nElements = $n1;
			cy.visit("http://localhost:8080/fridge")
			cy.get('#app').find('.v-list-item').first()
			.then(($item) => {

				$item.find(".productOptionsBtn").click()
				cy.get('#app').find(".deleteBtn").click()

				cy.wait(2000)
				.then(() => {

					cy.get('#app').find('.v-list-item').its('length')
					.then(($n2) => {

						expect( nElements ).to.be.lessThan( $n2 )

					})

				})

			})

		})

	})

})

/*
Feature: Bottom navbar functionality
*/

describe("Bottom navbar functionality", ()=>{
	/*
	Scenario: Checking nav button redirection
		Given user is at not-home url
		When user clicks on '<nav>' button
		Then user goes to '<nav>' path

			| nav 			|
			| #fridge 		|
			| #electricity 	|
			| #water 	 	|
			| #security 	|

	*/
	it("Checking nav button redirection", ()=>{

		cy.visit("http://localhost:8080/electricity")
		cy.get('#app').find('.v-bottom-navigation').find('button#fridge').click()
		cy.url().should("include", "/fridge")

	})
})
