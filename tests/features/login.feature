Feature: Login to Bahah CMS

  As a registered user
  I want to log in to the CMS
  So that I can access the dashboard
   
  @login
  Scenario: Login with valid credentials
    Given the user is on the login page
    When the user logs in with valid credentials
    Then the user should be redirected to the dashboard
