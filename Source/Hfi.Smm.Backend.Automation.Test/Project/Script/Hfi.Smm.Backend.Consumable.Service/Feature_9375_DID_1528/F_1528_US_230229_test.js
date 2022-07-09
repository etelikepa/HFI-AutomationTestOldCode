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
var myBarcodeConvert;

Given("valid barcode", function ()
{
  Util_Assertion.Skip("The valid barcode is validate.");
});

When("A valid GET extract barcode request with {arg} is sent to the Reagent Setup API", function (theBarcode)
{
  currentDateTime = dotNET.System.DateTime.UtcNow;
  myBarcodeConvert = Util_Helper.ConvertEncodeUrl(theBarcode);
  restApiGetReagent = Util_HttpRequest.MethodGet(Util_GLOBAL.SubBaseURLConsumable + GetReagentEndPoint + myBarcodeConvert);
  respondedData = Util_Helper.ToJSON(restApiGetReagent.Text).data.reagent;
});
    
When("A valid GET request with {arg} have Use Before Date is earlier than Shelf Life Exp is sent to the Reagent Setup API", function (theValidBarcode)
{
  currentDateTime = dotNET.System.DateTime.UtcNow;
  openExpirationDate = aqDateTime.AddDays(currentDateTime, 65);
  myBarcodeConvert = Util_Helper.ConvertEncodeUrl(theValidBarcode);
  restApiGetReagent = Util_HttpRequest.MethodGet(Util_GLOBAL.SubBaseURLConsumable + GetReagentEndPoint + myBarcodeConvert);
  respondedData = Util_Helper.ToJSON(restApiGetReagent.Text).data.reagent;
});
    
When("A valid GET request with {arg} have Shelf Life Exp is earlier than Use Before Date is sent to the Reagent Setup API", function (theValidBarcode)
{
  currentDateTime = dotNET.System.DateTime.UtcNow;
  openExpirationDate = aqDateTime.AddDays(currentDateTime, 50);
  myBarcodeConvert = Util_Helper.ConvertEncodeUrl(theValidBarcode);
  restApiGetReagent = Util_HttpRequest.MethodGet(Util_GLOBAL.SubBaseURLConsumable + GetReagentEndPoint + myBarcodeConvert);
  respondedData = Util_Helper.ToJSON(restApiGetReagent.Text).data.reagent;
});
    
When("A valid GET request with {arg} have Use Before Date = Shelf Life Exp is sent to the Reagent Setup API", function (theValidBarcode)
{
  currentDateTime = dotNET.System.DateTime.UtcNow;
  openExpirationDate = aqDateTime.AddDays(currentDateTime, 59);
  myBarcodeConvert = Util_Helper.ConvertEncodeUrl(theValidBarcode);
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
  var myExpectedDateTime = currentDateTime;
  var myActualDateTimeResponseFromApi = Util_Helper.ToJSON(restApiGetReagent.Text).data.reagent.dateOpened;
  // The string actual date time
  var myActualDateTime = aqConvert.StrToDateTime(myActualDateTimeResponseFromApi.slice(0, 10) + " " + myActualDateTimeResponseFromApi.slice(11, 19));
  Util_Assertion.AssertValuesAreEqual(true, Util_Assertion.CompareDateTimeErrorWasThreeSeconds(myExpectedDateTime, myActualDateTime), "Date Open: ", undefined);
});

Then("The system calculates the Open Expiration Date is the Date Opened + {arg} days", function (theDuration)
{ 
  openExpirationDate = aqDateTime.AddDays(currentDateTime, theDuration);
  var myExpectedDateTime = openExpirationDate;
  
  var myActualDateTimeResponseFromApi = Util_Helper.ToJSON(restApiGetReagent.Text).data.reagent.openExpirationDate;
  // The string actual date time
  var myActualDateTime = aqConvert.StrToDateTime(myActualDateTimeResponseFromApi.slice(0, 10) + " " + myActualDateTimeResponseFromApi.slice(11, 19));

  Util_Assertion.AssertValuesAreEqual(true, Util_Assertion.CompareDateTimeErrorWasThreeSeconds(myExpectedDateTime, myActualDateTime), "Open Expiration Date: ", undefined);
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