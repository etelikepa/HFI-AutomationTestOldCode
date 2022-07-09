//****************************************************************************
//
//  Beckman Coulter, Inc.
//
//        CONFIDENTIAL INFORMATION:
//        This program is the property of Beckman Coulter, Inc., and
//        shall not be copied or duplicated in any way without prior written
//        permission from Beckman Coulter, Inc. It is intended for
//        INTERNAL USE ONLY.
//
//****************************************************************************
//
//        Organization : DxH
//        Project      : HFI
//        Module       : System Manager Module Backend
//
//***************************************************************************

//USEUNIT Util_Assertion
//USEUNIT Util_GLOBAL
//USEUNIT Util_Helper
//USEUNIT Util_HttpRequest

var GetReagentEndPoint = "/reagents/";
var restApiGetReagent;
var respondedData;
var currentDateTime;
var openExpirationDate;

Given("valid barcode", function ()
{
  Util_Assertion.Skip("The valid barcode is validate.");
});

When("A valid GET extract barcode request with {arg} is sent to the Reagent Setup API", function (theBarcode)
{
  currentDateTime = dotNET.System.DateTime.UtcNow;
  var myBarcodeConvert = Util_Helper.ConvertEncodeUrl(theBarcode);
  restApiGetReagent = Util_HttpRequest.MethodGet(Util_GLOBAL.SubBaseURLConsumable + GetReagentEndPoint + myBarcodeConvert);
  respondedData = Util_Helper.ToJSON(restApiGetReagent.Text).data.reagent;
});
    
When("A valid GET request with {arg} have Use Before Date is earlier than Shelf Life Exp is sent to the Reagent Setup API", function (theValidBarcode)
{
  currentDateTime = dotNET.System.DateTime.UtcNow;
  openExpirationDate = aqDateTime.AddDays(currentDateTime, 65);
  var myBarcodeConvert = Util_Helper.ConvertEncodeUrl(theValidBarcode);
  restApiGetReagent = Util_HttpRequest.MethodGet(Util_GLOBAL.SubBaseURLConsumable + GetReagentEndPoint + myBarcodeConvert);
  respondedData = Util_Helper.ToJSON(restApiGetReagent.Text).data.reagent;
});
    
When("A valid GET request with {arg} have Shelf Life Exp is earlier than Use Before Date is sent to the Reagent Setup API", function (theValidBarcode)
{
  currentDateTime = dotNET.System.DateTime.UtcNow;
  openExpirationDate = aqDateTime.AddDays(currentDateTime, 50);
  var myBarcodeConvert = Util_Helper.ConvertEncodeUrl(theValidBarcode);
  restApiGetReagent = Util_HttpRequest.MethodGet(Util_GLOBAL.SubBaseURLConsumable + GetReagentEndPoint + myBarcodeConvert);
  respondedData = Util_Helper.ToJSON(restApiGetReagent.Text).data.reagent;
});
    
When("A valid GET request with {arg} have Use Before Date = Shelf Life Exp is sent to the Reagent Setup API", function (theValidBarcode)
{
  currentDateTime = dotNET.System.DateTime.UtcNow;
  openExpirationDate = aqDateTime.AddDays(currentDateTime, 59);
  var myBarcodeConvert = Util_Helper.ConvertEncodeUrl(theValidBarcode);
  restApiGetReagent = Util_HttpRequest.MethodGet(Util_GLOBAL.SubBaseURLConsumable + GetReagentEndPoint + myBarcodeConvert);
  respondedData = Util_Helper.ToJSON(restApiGetReagent.Text).data.reagent;
});
    
Then("The Reagent Setup extract barcode API will respond with status {arg}", function (theExpectedStatus)
{
  Util_Assertion.AssertValuesAreEqual(theExpectedStatus, restApiGetReagent.StatusCode, "Status Code", undefined);
});

Then("The {arg}: {arg} will have the correct data", function (theProperty, theExpectedValue)
{
  var myPropertyValue = aqObject.GetPropertyValue(respondedData, theProperty);
  var myLifeExpDate = dotNET.System.DateTime.Parse(Util_Helper.ToJSON(restApiGetReagent.Text).data.reagent.reagentShelfLifeExpirationDate);
  if(theProperty == "isExpired")
  {
    Util_Assertion.AssertValuesAreEqual(Util_Helper.ToBoolean(theExpectedValue), myPropertyValue, "Property Value: ", undefined);
  }
  else
  {
    Util_Assertion.AssertValuesAreEqual(theExpectedValue, myPropertyValue, "Property Value: ", undefined);
  }
});

Then("The system generates the current system date as the Date Opened", function ()
{
  var myExpectedDateTime = aqDateTime.AddSeconds(currentDateTime, -5);
  // Expected date is sliced to compare with actual date
  var myExpectedDate = aqConvert.DateTimeToFormatStr(currentDateTime, "%Y-%m-%d");
  // Expected time is sliced to compare with actual time
  var myExpectedTime = aqConvert.StrToDateTime(aqConvert.DateTimeToFormatStr(myExpectedDateTime, "%Y-%m-%dT%H:%M:%SZ").slice(11,19));

  var myActualDateTimeResponseFromApi = Util_Helper.ToJSON(restApiGetReagent.Text).data.reagent.dateOpened;
  // Actual date is sliced to compare with expected date
  var myActualDate = myActualDateTimeResponseFromApi.slice(0,10);
  // Actual time is sliced to compare with expected time
  var myActualTime = aqConvert.StrToDateTime(myActualDateTimeResponseFromApi.slice(11,19));
  
  // Compare expected date with actual date
  Util_Assertion.AssertValuesAreEqual(myExpectedDate, myActualDate, "Date: ", undefined);
  // Compare expected time with actual time
  if (aqDateTime.Compare(myExpectedTime, myActualTime) < 1)
  {
    Util_Assertion.Pass("Date Opened is true.", undefined);
  }
  else
  {
    Util_Assertion.Fail("Date Opend is false.", undefined);
  }
});

Then("The system calculates the Open Expiration Date is the Date Opened + {arg} days", function (theDuration)
{ 
  openExpirationDate = aqDateTime.AddDays(currentDateTime, theDuration);
  var myOpenExpirationDateSubtractedFiveSecond = aqDateTime.AddSeconds(openExpirationDate, -5);
  var myExpectedDateTime = aqConvert.DateTimeToFormatStr(myOpenExpirationDateSubtractedFiveSecond, "%Y-%m-%dT%H:%M:%SZ");
  // Expected date is sliced to compare with actual date
  var myExpectedDate = aqConvert.DateTimeToFormatStr(myOpenExpirationDateSubtractedFiveSecond, "%Y-%m-%d");
  // Expected time is sliced to compare with actual time
  var myExpectedTime = aqConvert.StrToDateTime(myExpectedDateTime.slice(11,19));
  
  var myActualDateTimeResponseFromApi = Util_Helper.ToJSON(restApiGetReagent.Text).data.reagent.openExpirationDate;
  // Actual date is sliced to compare with expected date
  var myActualDate = myActualDateTimeResponseFromApi.slice(0,10);
  // Actual time is sliced to compare with expected time
  var myActualTime = aqConvert.StrToDateTime(myActualDateTimeResponseFromApi.slice(11,19));

  // Compare expected date with actual date
  Util_Assertion.AssertValuesAreEqual(myExpectedDate, myActualDate, "Date: ", undefined);
  // Compare expected time with actual time
  if (aqDateTime.Compare(myExpectedTime, myActualTime) < 1)
  {
    Util_Assertion.Pass("Open Expiration Date is true.", undefined);
  }
  else
  {
    Util_Assertion.Fail("Open Expiration Date is false.", undefined);
  }
});

Then("The system calculates the Use Before Date based on the earliest of the Open Exp Date and Shelf Life Exp Date", function ()
{
  var myUseBeforeDate;
  var myLifeExpDate = aqDateTime.AddHours(dotNET.System.DateTime.Parse(Util_Helper.ToJSON(restApiGetReagent.Text).data.reagent.reagentShelfLifeExpirationDate), -7); 
  if (dotNET.System.DateTime.Compare(openExpirationDate, myLifeExpDate) == 1)
  {
    myUseBeforeDate = myLifeExpDate;
  }
  else
  {
    myUseBeforeDate = openExpirationDate;
  };
  var myActualUseBeforeDate = Util_Helper.ToJSON(restApiGetReagent.Text).data.reagent.useBeforeDate;
  var myExpectedUseBeforeDate = aqConvert.DateTimeToFormatStr(myUseBeforeDate, "%Y-%m-%dT23:59:59Z");
  Util_Assertion.AssertValuesAreEqual(myExpectedUseBeforeDate, myActualUseBeforeDate, "Use Before Date: ", undefined);
});