# Angular 2 - Webpack Seed

## Commands:
1. **npm start** - This is for local development. It will bundle the app and turn on the webpack-dev-server and also enable hot module replacement
   to allow for continuous development without having to worry to refresh the browser
2. **npm test** - This is for local testing. It will compile the app and run the unit test as well as watch any changes that might take place to the unit test
   if changes are made it will recompile and re-run the test
3. **npm run test-coverage** - This is for prod and single test running to produce front end unit testing coverage.
4. **npm run build:prod** - This is for prod builds. It will bundle the app and vendors js files and run all the goods on them and then pump them out to the dist
   folder