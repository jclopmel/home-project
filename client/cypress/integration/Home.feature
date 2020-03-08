Feature: Home minimum configuration

	Four main buttons must be displayed and accessible

	Scenario: Checking four buttons are displayed
		Given User is at home url
		When User checks four buttons
		Then User finds four buttons

	Scenario: Main buttons redirect correctly
		Given User is at home url
		When User clicks on
			| mainButtons 	|
			| 0 			|
		# 	| 1			 	|
		# 	| 2 			|
		# 	| 3 			|
		Then Url should include
			| mainUrl 			|
			| fridge 			|
		# 	| electricity 		|
		# 	| water 	 		|
		# 	| security 			|