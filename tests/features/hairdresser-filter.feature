@hairdresser-filter
Feature: Hairdresser filter

    Scenario: Verify Disabled Hairdresser Filter
        Given the user is logged in
        And the user is on the hairdresser listing page
        When the user applies "Disabled" status filter
        Then API should return only inactive users
        And UI should match API response