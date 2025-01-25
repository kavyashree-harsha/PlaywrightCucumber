Feature: User Authentication Tests

Background: 
Given User navigates to the application
And User clicks on login link

Scenario: Login should be success
And User enters valid name as "ortoni"
And Users enters valid password as "Pass1234"
When User clicks on Login button
Then Login should be successful

Scenario: Login should not be success
And User enters name as "kavya"
And Users enters password as "Pass1234"
When User clicks on Login button
Then Login should fail
