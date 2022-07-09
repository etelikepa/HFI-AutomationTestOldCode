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
//USEUNIT Util_DatabaseHelper
//USEUNIT Util_GLOBAL
//USEUNIT Util_Helper
//USEUNIT Util_HttpRequest

var resApiReagentSetup, resApiSaveReagent, resApiGetReagent;
var validBarcodeGiven, instrumentIdGiven, containerIdGiven, cyclesRemainingGiven, barcode, instrumentId, containerId, cyclesRemaining,
    instrumentIdOfReagentSetup, containerIdOfReagentSetup, cyclesRemainingOfReagentSetup;
  
// BeforeFeature: Describe the actions taken before running each feature.
BeforeFeature(function (feature)
{
  if(feature.Name == "US_226466 - Container reuse")
  {
    Util_DatabaseHelper.ConnectDatabase("IcmSimulation", "postgres", "postgres");
    Util_DatabaseHelper.QueryToEdit("update \"ICMDevice\" set \"Status\"= 'Off'::text where \"DeviceId\" = 'Instrument';")
    Util_DatabaseHelper.DisconnectDatabase("IcmSimulation");
    Util_DatabaseHelper.ConnectDatabase("hfi_consumable", "postgres", "postgres");
    Util_DatabaseHelper.QueryToEdit("delete from reagent;");
  }
});

// AfterFeature: Describe the actions taken after running each feature.
AfterFeature(function (feature)
{
  if(feature.Name == "US_226466 - Container reuse")
  {
    Util_DatabaseHelper.DisconnectDatabase("hfi_consumable");
  }
}); 
          
Given("The valid barcode is available and it had not been setup before", function ()
{   
  Util_Assertion.Skip("The valid barcode is available and it had not been setup before");
});

When("A valid GET request with Valid barcode {arg} is sent to the Reagent Setup API", function (theValidBarcode)
{
  var myBarcodeConvert = Util_Helper.ConvertEncodeUrl(theValidBarcode);
  resApiReagentSetup = Util_HttpRequest.MethodGet(Util_GLOBAL.SubBaseURLConsumable + "/reagents/" + myBarcodeConvert);
});

Then("The Reagent Setup API will respond with status code {arg} and flag {arg}", function (expectedStatusCode, expectedIsExisted)
{
  Util_Assertion.AssertValuesAreEqual(expectedStatusCode, resApiReagentSetup.StatusCode, "Status Code: ", undefined); 
  Util_Assertion.AssertValuesAreEqual(Util_Helper.ToBoolean(expectedIsExisted), Util_Helper.ToJSON(resApiReagentSetup.Text).data.isExisted, "Is Existed Flag: ", undefined);
});

Given("The reagent is input and validated successfully that have not been setup before", function ()
{  
  Util_Assertion.Skip("The reagent is input and validated successfully that have not been setup before");
});

Given("The Valid barcode given {arg} is input and validated correctly", function (theValidBarcodeGiven)
{
  validBarcodeGiven = theValidBarcodeGiven;
});

Given("The Instrument Id given {arg} is input and validated correctly", function (theInstrumentIdGiven)
{
  instrumentIdGiven = theInstrumentIdGiven;
});

Given("The Container Id given {arg} is input and validated correctly", function (theContainerIdGiven)
{
  containerIdGiven = theContainerIdGiven;
});

Given("The Cycles Remaining given {arg} will have the correct data", function (theCyclesRemainingGiven)
{
  cyclesRemainingGiven = theCyclesRemainingGiven;
});

When("A valid POST request of Container Reuse is sent to the Save Reagent API", function ()
{
  var myJsonBody = 
  {
    "barcode": validBarcodeGiven,
    "instrumentId": instrumentIdGiven,
    "containerId": containerIdGiven,
    "cyclesRemaining": cyclesRemainingGiven
  };
  resApiSaveReagent = Util_HttpRequest.MethodPost(Util_GLOBAL.SubBaseURLConsumable + "/reagents/", myJsonBody);
});

Then("The system saves the reagent successfully and responds with status code {arg}", function (expectedStatusCode)
{
  Util_Assertion.AssertValuesAreEqual(expectedStatusCode, resApiSaveReagent.StatusCode, "Status Code: ", undefined);
});

When("A valid POST request sent to the Save Reagent API with Barcode {arg} is input and validated correctly", function (theBarcode)
{
  barcode = theBarcode;
});
    
When("The Instrument Id of the Reagent Setup API {arg} is input and validated correctly", function (theInstrumentIdOfReagentSetup)
{
  instrumentIdOfReagentSetup = theInstrumentIdOfReagentSetup;
});

When("The Container Id of the Reagent Setup API {arg} is input and validated correctly", function (theContainerIdOfReagentSetup)
{
  containerIdOfReagentSetup = theContainerIdOfReagentSetup;
});

When("The Cycles Remaining of the Reagent Setup API {arg} will have the correct data", function (theCyclesRemainingOfReagentSetup)
{
  cyclesRemainingOfReagentSetup = theCyclesRemainingOfReagentSetup;
  var myJsonBody = 
  {
    "barcode": barcode,
    "instrumentId": instrumentIdOfReagentSetup,
    "containerId": containerIdOfReagentSetup,
    "cyclesRemaining": cyclesRemainingOfReagentSetup
  };
  resApiSaveReagent = Util_HttpRequest.MethodPost(Util_GLOBAL.SubBaseURLConsumable + "/reagents/", myJsonBody);
});

Then("The Reagent Setup API will respond with status {arg}", function (expectedStatus)
{
  Util_Assertion.AssertValuesAreEqual(expectedStatus, Util_Helper.ToJSON(resApiSaveReagent.Text).error.details[0].code, "Error Code: ", undefined);
});
    
Given("The first reagent is setup successfully with {arg}, {arg}, {arg}, {arg}", function (theFirstBarcode, theFirstInstrumentId, theFirstContainerId, theFirstCyclesRemaining)
{      
  var myBarcodeConvert = Util_Helper.ConvertEncodeUrl(theFirstBarcode)
  resApiGetReagent = Util_HttpRequest.MethodGet(Util_GLOBAL.SubBaseURLConsumable + "/reagents/" + myBarcodeConvert);
  let myIsExisted = new Boolean(Util_Helper.ToJSON(resApiGetReagent.Text).data.isExisted);
  if(myIsExisted != Util_Helper.ToBoolean("true"))
  {
    Log.Message("The valid barcode had not been setup before");
    var myJsonBody = 
    {
      "barcode": myBarcodeConvert,
      "instrumentId": theFirstInstrumentId,
      "containerId": theFirstContainerId,
      "cyclesRemaining": theFirstCyclesRemaining
    };
    resApiSaveReagent = Util_HttpRequest.MethodPost(Util_GLOBAL.SubBaseURLConsumable + "/reagents/", myJsonBody);
  }
  else
  {
    Log.Message("The valid barcode is exist");
  }
});

When("The Instrument Id {arg} is input and validated correctly", function (theInstrumentId)
{
  instrumentId = theInstrumentId
});

When("The Container Id {arg} is input and validated correctly", function (theContainerId)
{
  containerId = theContainerId;
});

When("The Cycles Remaining {arg} will have the correct data", function (theCyclesRemaining)
{
  cyclesRemaining = theCyclesRemaining;
  var myJsonBody = 
  {
    "barcode": barcode,
    "instrumentId": instrumentId,
    "containerId": containerId,
    "cyclesRemaining": cyclesRemaining
  };
  resApiSaveReagent = Util_HttpRequest.MethodPost(Util_GLOBAL.SubBaseURLConsumable + "/reagents/", myJsonBody);
});

Then("The system saves the reagent unsuccessfully and responds with status {arg}", function (expectedStatus)
{
  Util_Assertion.AssertValuesAreEqual(expectedStatus, Util_Helper.ToJSON(resApiSaveReagent.Text).error.details[0].code, "Error Code: ", undefined);
});