# Used for base object
$personalAccessToken = "znsaxup67n23READACTEDyga2h4mraqztpqbljkldjuba"
$SCRIPT:organizationName = "BeckmanCoulter"
$SCRIPT:projectName = "HFI-Platform"
$testPlanId = "244778" # You should set up a new test plan for testing purposes.
$SCRIPT:mainEndPoint = "https://dev.azure.com/$organizationName/$projectName"

$authHeader = @{
  Authorization = 'Basic' + [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(":$($personalAccessToken)"))
}

function Get-AllTestSuites {
  Param()
  $testSuitesEndpoint = $mainEndPoint + "/_apis/testplan/Plans/" + $testPlanId + "/suites?api-version=6.0-preview.1"
  $testSuitesResponse = Invoke-RestMethod -Uri $testSuitesEndpoint -Method Get -Header $AuthHeader
  $testSuites = $testSuitesResponse.value
  return $testSuites
}

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

function Get-TcReport {
  Param(
    [String]$ReportPath
  )
  $jsonData = Get-Content -Raw -Path $ReportPath | ConvertFrom-Json
  return $jsonData
}


$testSuites = Get-AllTestSuites
foreach ($testSuite in $testSuites) {
  $testSuiteId = $testSuite.id
  
  # Sample tc_result.json content
  # [
  #   {
  #     "testCase": "245133",
  #     "result": "Failed"
  #   },
  #   {
  #     "testCase": "245171",
  #     "result": "Passed"
  #   }
  # ]

  $report = Get-TcReport -ReportPath "D:\_work\_poc\tc_result.json"

  # Iterate each item in the sample TC report
  foreach ($item in $report) {

    # Find the test case that matches the respective test point
    # This only works when a test case has a single test point (1:1)
    $testPoints = Get-AllTestPointsByTestSuite -MainEndPoint $mainEndPoint -TestPlanId $testPlanId -TestSuiteId $testSuiteId | Where-Object {$_.testCaseReference.id -eq $item.testCase}
    foreach ($testPoint in $testPoints) {
      #$testpoint
      Write-Host -ForegroundColor Green "Test Case Name:" $testPoint.testCaseReference.name
      Write-Host -ForegroundColor Yellow "`t Test Plan Id:" $testPoint.testPlan.id
      Write-Host -ForegroundColor Yellow "`t Test Plan Name:" $testPoint.testPlan.name
      Write-Host -ForegroundColor Yellow "`t Test Suite Name:" $testPoint.testSuite.name
      Write-Host -ForegroundColor Yellow "`t Test Suite Id:" $testPoint.testSuite.id
      Write-Host -ForegroundColor Yellow "`t Test Case ID:" $testPoint.testCaseReference.id
      Write-Host -ForegroundColor Yellow "`t Tester:" $testPoint.tester.displayName
      $testPointId = $testPoint.id
      $testCaseId = $testPoint.testCaseReference.id 

      # Create a test run for test point
      $runs = New-TestRun -TestPointId $testPointId

      foreach ($run in $runs) {

        # Get all test results for a run.
        # Need to see how to get the latest one.
        $runResults = Get-AllTestResultRun -RunId $($run.id)
        foreach ($runResult in $runResults) {
          Write-Host -BackgroundColor Magenta "[+] START UPDATING TEST RESULT... " 
          # Update the latest one
          $result = Update-TestResult -RunId $run.id -TestResultId $runResult.id -TestCaseId $testCaseId -Result $item.result
          if ($result) {
            Write-Host -BackgroundColor DarkGray "[+] UPDATED TEST RESULT SUCCESFULLY... " 
          }
          else {
            Write-Host -BackgroundColor RED "[!] FAILED TO UPDATING RESULT... " 
          }
        }
      }
    }
  }
}


