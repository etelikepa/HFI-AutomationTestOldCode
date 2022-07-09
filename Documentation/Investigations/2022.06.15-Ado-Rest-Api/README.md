# Overview

This document provides an analysis of using Azure DevOps (ADO) REST API to update test results from a custom Test result report programmatically.

The article is intended to support the automation process to map test case result from TestComplete with an ADO test case.

> The PoC code in this document is written in PowerShell. 

# REST API Demystified

There are different ways to authorize ADO REST API. One of the quickest ways is using your personal access token (PAT).

> In the real environment, we shouldn't use PAT.

Below is the sample code snippet to initialize a base object to work with REST API. You need:
- Personal access token
- Organization Name
- Project Name
- Test Plan ID (optional)
- Authorization Header

```powershell
$personalAccessToken = "znsaxup67n-REDACTED-4mraqztpqbljkldjuba"
$SCRIPT:organizationName = "BeckmanCoulter"
$SCRIPT:projectName = "HFI-Platform"
$testPlanId = "244778" # For testing purpose
$SCRIPT:mainEndPoint = "https://dev.azure.com/$organizationName/$projectName"

$authHeader = @{
  Authorization = 'Basic' + [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(":$($personalAccessToken)"))
}
```

A test plan has test suites. Test suites may have nested test suites. Each test suite contains one or many test points. 

## Get all Test suites

To get all Test suites under a given Test plan, use the sample code snippet below:

```powershell
function Get-AllTestSuites {
  Param()
  $testSuitesEndpoint = $mainEndPoint + "/_apis/testplan/Plans/" + $testPlanId + "/suites?api-version=6.0-preview.1"
  $testSuitesResponse = Invoke-RestMethod -Uri $testSuitesEndpoint -Method Get -Header $AuthHeader
  $testSuites = $testSuitesResponse.value
  return $testSuites
}
```

## Get all Test points
You will need to get all test points under a test suite. This can be done by:

```powershell
function Get-AllTestPointsByTestSuite{
  Param(
    [string]$MainEndPoint,
    [string]$TestPlanId,
    [string]$TestSuiteId
  )
  $testPointsEndPoint = $mainEndPoint + "/_apis/testplan/Plans/$testPlanId/suites/" + $testSuiteId + "/TestPoint/" + "?api-version=5.1-preview.2"
  $testPointsResponse = Invoke-RestMethod -Uri $testPointsEndPoint -Method Get -Header $authHeader
  $testPoints = $testPointsResponse.value
  return $testPoints
}
```

> A test point is a unique combination of test case, test suite, configuration, and tester.

Each test point contains one or many test runs. Each test run may have one or many test results.

You may need to update an existing test run's result. It would not be recommended. You should create a new run and update the result.

## Create a new Test run

To create a new test run for a given test point, use the sample code snippet below:

```powershell
function New-TestRun{
  Param(
    [string]$TestPointId
  )

  $runEndpoint = $mainEndPoint + "/_apis/test/runs?api-version=5.1"
  $body = [Ordered]@{
    name = $TestPointId
    plan = @{
      id = $testPlanId
    }
    pointIds = @(
      $TestPointId
    )
  }
  $requestBody = $body | ConvertTo-Json -Depth 3
  $response = Invoke-RestMethod -Uri $runEndpoint `
                                -ContentType "application/json" `
                                -Method POST `
                                -Headers $authHeader `
                                -Body $requestBody
  return $response
}
```

# Get and Upda Test result of a test run

You only need to update the latest test result for a test run. First, you need to get all the results of a given test run.

```powershell
function Get-AllTestResultRun {
  Param(
    [string]$RunId
  )

  $testResultEndpoint = $mainEndPoint + "/_apis/test/runs/" + $RunId + "/results?api-version=6.0"
  $response = Invoke-RestMethod -Method Get -Uri $testResultEndpoint -Header $authHeader
  $result = $response.value
  return $result
}
function Update-TestResult {
  Param(
    [String]$TestResultId,
    [String]$RunId,
    [String]$TestCaseId,
    [String]$Result
  )

  $runIdEndpoint = $mainEndPoint + "/_apis/test/Runs/" + $RunId + "/results?api-version=6.0"

  # Sample request body
  $body = @(
    @{
      id = $TestResultId
      state = "Completed"
      testCase = @{
        id = $TestCaseId
      }
      outcome = $Result
    }
  )
  
  $requestBody = ConvertTo-Json -InputObject $body
  $runIdEndpoint
  $response = Invoke-RestMethod -Uri $runIdEndpoint `
                                -ContentType "application/json" `
                                -Method PATCH `
                                -Headers $authHeader `
                                -Body $requestBody
  $resultResponse = $response.value
  return $resultResponse
}
```

# Notes

The REST API does support updating the test result via test point. The operation can be either:
- A custom JavaScript that is run when a test case finishes its execution using [OnStopTest Event Handler](https://support.smartbear.com/testcomplete/docs/reference/events/onstoptest.html)
- A custom script to run read a custom test result report and iteratively read each result and map by Test case ID. To do this, we need to investigate if TestComplete provides a detailed result with respective tag.  

# REST API Reference

- https://docs.microsoft.com/en-us/rest/api/azure/devops/testplan/test-point/update?view=azure-devops-rest-6.0
- https://docs.microsoft.com/en-us/rest/api/azure/devops/test/runs?view=azure-devops-rest-6.0
- https://docs.microsoft.com/en-us/rest/api/azure/devops/test/results?view=azure-devops-rest-6.0
- https://docs.microsoft.com/en-us/azure/devops/integrate/get-started/authentication/authentication-guidance?view=azure-devops