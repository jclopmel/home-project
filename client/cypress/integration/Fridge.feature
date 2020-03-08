Feature: Fridge functionality

	CRUD and navigation functions must work

	Scenario: Back to home
		Given User is at fridge url
		When User clicks on home button
		Then User navigates to home url

	Scenario: Change one product amount
		Given User is at fridge url
		And at least one product remains in storage
		When user clicks on first item
			| amountButton 	|
			| .more 		|
			# | .less 		|
		Then text of first item changes

	Scenario: Add-product button is disabled when user enters incorrect values
		Given User is at fridge url
		When user enters at new-product form incorrect values
			| name 	| amount 	| icon 	|
			| "" 	| "ab" 		| "" 	|
		Then add-product button is disabled

	Scenario: Adding new products changes product list length
		Given User is at fridge url
		When user enters at new-product form values
			| name 		| amount 	| icon 	|
			| Water 	| 2 		| 0 	|
		And user clicks on add-product button
		Then products list length changes

	Scenario: Deleting products changes product list length
		Given User is at fridge url
		When at least one product in storage
		And user clicks on vertical-dots button
		And user clicks on delete button
		Then products list length decreases

	Scenario: Bottom navbar functionality
		Given user is at not-home url
		When user clicks on
			| nav 			|
			| #fridge 		|
			# | #electricity 	|
			# | #water 	 	|
			# | #security 	|
		Then user navigates to
			| url 			|
			| fridge 		|
			# | electricity 	|
			# | water 	 	|
			# | security 		|