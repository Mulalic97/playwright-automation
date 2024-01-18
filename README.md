# automated-qa-playwright
Playwright automation framework for e2e testing with test artifacts uploaded to amazon s3 bucket

# Getting Started
1. Clone the repository
   git clone https://github.com/Mulalic97/automated-qa-playwright.git

2. Navigate to the project and run the setup command
   
   ```npm i```

4. Run tests
   # npm run test:{environment}
   
   ```npm run test:ci```
   # Run individual tests
   
   ```npx playwright test {**/*.ts}```
   # Run headed tests
   
   ```npx playwright test --headed```
   # Display report from previous run

   ```npx playwright show-report```

