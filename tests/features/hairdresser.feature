@hairdresser
Feature: Hairdresser reviews

  Scenario: User submits a rating and review successfully
    Given the user is logged in
    And the user is on the hairdresser listing page
    When the user selects hairdresser at row 1
    And the user fills a positive review
    And submits the review
    Then the review should be submitted successfully
    And the review count should increase at row 1

  Scenario: User cancels review submission
    Given the user is logged in
    And the user is on the hairdresser listing page
    When the user selects hairdresser at row 2
    And the user fills a negative review
    And cancels the review
    Then the review should not be submitted
    And the review count should not change at row 2
