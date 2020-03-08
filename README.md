# Home App - A Node & Vue Project
This app is desgined to have 4 modules to offer an absolute management of your home from every device. Only module 1 is developed right now: A CRUD app with DB connection and offline features to manage users home storage.

## Features

- Fast routing engine with Vue-Router
- Powerful dependency injection with npm
- Node backend for DB requests and work processing
- Easy to use User Interface
- Multibrowser app
- Responsive app
- Offline funcionality with localStorage support
- Data parsing to protect DB consistency
- Low latency app for good User Experience

## Requirements
- Node

## Project Setup
Clone the repository
```
$ https://github.com/jclopmel/home-project.git
```
Install dependencies in root folder
```
$ npm install
```
Run node server
```
$ npm run dev
```
Access /client folder and install client dependencies
```
$ npm install
```
Run client
```
$ npm run serve
```
At the end of the setup process frontend app is going to be working at localhost:8080 and backend is going to be ready to listen for request al localhost:5000.

## Testing the app
The app have passed 11 functional and non-functional, backend and frontend test you can duplicate. Server, client, git, DB consistency and responsiveness can be tested through development process. For that reason here you can find the one you can reproduce in only one step:

#### Contrast Visual Testing
Main colors in website are #ffffff and #757575. You can check readability with next online tool:
https://webaim.org/resources/contrastchecker/
#### Offline Functionality
CRUD DB queries are stored using localStorage during non-online time-lapse. Check it by deactivating internet connection of your device.
#### Performance Testing
With Artillery you can test  performance from root folder and next script:
```
$ artillery quick --count 50 -n 1 http://localhost:8080/#/fridge
```
#### Throttling Testing
With developers Firefox Tools you can change bandwidth of your browser and refresh it. In Network tab you will be able to check the response time in every axios request. They always stays under 2s waiting time.
#### Unit Testing
There are 9 already designed Jest and Vue-Unit-Testing tests, organized in different files depending on functionality. You can check them from /client folder and running next script:
```
$ npm run test:unit
```
#### Functional Testing
There are 12 already designed Cypress tests in e2e.spec.js file. You can check them from /client folder and running next script:
```
$ npx cypress open
```
#### Alternative Functional Testing
In order to check and compare Cypress vs Cypress-cucumber-preprocessor 8 additional scenarios are ready to be run. Just uncomment lines 18 and 21 in /client/cypress/plugins/index.js, change tested files in cypress.json in /client folder and run:
```
$ npx cypress open
```
Information related about how to run vue client is inside client folder. Just in case you only want to reproduce vue-cli.