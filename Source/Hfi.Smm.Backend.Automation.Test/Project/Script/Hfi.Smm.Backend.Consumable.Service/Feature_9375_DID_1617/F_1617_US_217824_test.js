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

var validBarcodeGiven, instrumentIdGiven, containerIdGiven, cyclesRemainingGiven, barcode, instrumentId, containerId, cyclesRemaining,
    instrumentIdOfReagentSetup, containerIdOfReagentSetup, cyclesRemainingOfReagentSetup;
var GetReagentEndPoint = "/reagents/";
var SaveReagentEndPoint = "/reagents";
var resApiSaveReagent, resApiGetReagent;
var IcmSimulationConnection;
var ConsumableConnection;

// Function save Reagent successfully.
function SaveReagentSuccessfully (theBarcode, theInstrumentId, theContainerId, theCyclesRemaining)
{
  var myJsonBody = 
  {
    "barcode": theBarcode,
    "instrumentId": theInstrumentId,
    "containerId": theContainerId,
    "cyclesRemaining": theCyclesRemaining
  };
  resApiSaveReagent = Util_HttpRequest.MethodPost(Util_GLOBAL.SubBaseURLConsumable + SaveReagentEndPoint, myJsonBody);
};

Given("The valid barcode is available and it had not been setup before", function ()
{   
  Util_Assertion.Skip("The valid barcode is available and it had not been setup before");
});

When("A valid GET request with Valid barcode {arg} is sent to the Reagent Setup API to check isExisted of Reagent", function (theValidBarcode)
{
  ConsumableConnection = Util_DatabaseHelper.ConnectDatabase("hfi_consumable", "postgres", "postgres");
  Util_DatabaseHelper.QueryToEdit(ConsumableConnection, "delete from reagent where barcode = '" + theValidBarcode + "';");
  Util_DatabaseHelper.DisconnectDatabase(ConsumableConnection);
  var myBarcodeConvert = Util_Helper.ConvertEncodeUrl(theValidBarcode);
  resApiGetReagent = Util_HttpRequest.MethodGet(Util_GLOBAL.SubBaseURLConsumable + GetReagentEndPoint + myBarcodeConvert);
});

When("A valid GET request with Valid barcode {arg} is sent to the Reagent Setup API", function (theValidBarcode)
{
  var myBarcodeConvert = Util_Helper.ConvertEncodeUrl(theValidBarcode);
  resApiGetReagent = Util_HttpRequest.MethodGet(Util_GLOBAL.SubBaseURLConsumable + GetReagentEndPoint + myBarcodeConvert);
});

Then("The Reagent Setup API will respond with status code {arg} and flag {arg}", function (expectedStatusCode, expectedIsExisted)
{
  Util_Assertion.AssertValuesAreEqual(expectedStatusCode, resApiGetReagent.StatusCode, "Status Code: ", undefined); 
  Util_Assertion.AssertValuesAreEqual(Util_Helper.ToBoolean(expectedIsExisted), Util_Helper.ToJSON(resApiGetReagent.Text).data.isExisted, "Is Existed Flag: ", undefined);
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
  IcmSimulationConnection = Util_DatabaseHelper.ConnectDatabase("IcmSimulation", "postgres", "postgres");
  Util_DatabaseHelper.QueryToEdit(IcmSimulationConnection, "update \"ICMDevice\" set \"Status\"= 'Off'::text where \"DeviceId\" = 'Instrument';");
  Util_DatabaseHelper.DisconnectDatabase(IcmSimulationConnection);
  var myBarcodeConvert = Util_Helper.ConvertEncodeUrl(validBarcodeGiven);
  restApiGetReagent = Util_HttpRequest.MethodGet(Util_GLOBAL.SubBaseURLConsumable + GetReagentEndPoint + myBarcodeConvert);    
  var myIsExisted = new Boolean(Util_Helper.ToJSON(restApiGetReagent.Text).data.isExisted);
  if(myIsExisted != Util_Helper.ToBoolean("True"))
  {
    SaveReagentSuccessfully(validBarcodeGiven, instrumentIdGiven, containerIdGiven, cyclesRemainingGiven);
  }
  else
  {
    ConsumableConnection = Util_DatabaseHelper.ConnectDatabase("hfi_consumable", "postgres", "postgres");
    Util_DatabaseHelper.QueryToEdit(ConsumableConnection, "delete from reagent where barcode = '" + validBarcodeGiven + "';");
    Util_DatabaseHelper.DisconnectDatabase(ConsumableConnection);
    SaveReagentSuccessfully(validBarcodeGiven, instrumentIdGiven, containerIdGiven, cyclesRemainingGiven);
  }
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
  resApiSaveReagent = Util_HttpRequest.MethodPost(Util_GLOBAL.SubBaseURLConsumable + SaveReagentEndPoint, myJsonBody);
});

Then("The Reagent Setup API will respond with status {arg}", function (expectedStatus)
{
  Util_Assertion.AssertValuesAreEqual(expectedStatus, Util_Helper.ToJSON(resApiSaveReagent.Text).error.details[0].code, "Error Code: ", undefined);
});
    
Given("The first reagent is setup successfully with {arg}, {arg}, {arg}, {arg}", function (theFirstBarcode, theFirstInstrumentId, theFirstContainerId, theFirstCyclesRemaining)
{      
  IcmSimulationConnection = Util_DatabaseHelper.ConnectDatabase("IcmSimulation", "postgres", "postgres");
  Util_DatabaseHelper.QueryToEdit(IcmSimulationConnection, "update \"ICMDevice\" set \"Status\"= 'Off'::text where \"DeviceId\" = 'Instrument';");
  Util_DatabaseHelper.DisconnectDatabase(IcmSimulationConnection);
  var myBarcodeConvert = Util_Helper.ConvertEncodeUrl(theFirstBarcode);
  resApiGetReagent = Util_HttpRequest.MethodGet(Util_GLOBAL.SubBaseURLConsumable + GetReagentEndPoint + myBarcodeConvert);
  let myIsExisted = new Boolean(Util_Helper.ToJSON(resApiGetReagent.Text).data.isExisted);
  if(myIsExisted != Util_Helper.ToBoolean("True"))
  {
    SaveReagentSuccessfully(theFirstBarcode, theFirstInstrumentId, theFirstContainerId, theFirstCyclesRemaining);
  }
  else
  {
    Log.Message("The reagent is existed.");
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
  resApiSaveReagent = Util_HttpRequest.MethodPost(Util_GLOBAL.SubBaseURLConsumable + SaveReagentEndPoint, myJsonBody);
});

Then("The system saves the reagent unsuccessfully and responds with status {arg}", function (expectedStatus)
{
  Util_Assertion.AssertValuesAreEqual(expectedStatus, Util_Helper.ToJSON(resApiSaveReagent.Text).error.details[0].code, "Error Code: ", undefined);
});