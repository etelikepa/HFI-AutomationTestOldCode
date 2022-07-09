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

var barcode, instrumentId, containerId, containerIdOne, containerIdTwo, cyclesRemaining, cyclesRemainingOne, cyclesRemainingTwo, configurationSingle, barcodeInvalid; 
var SaveReagentEndPoint = "/reagents";
var resApiSaveReagent;
// The string is generated random 256 characters.
var TheStringIsGenerated = Util_Helper.GenerateString(256);
    
// BeforeFeature: Describe the actions taken before running each feature.
BeforeFeature(function (feature)
{
  if(feature.Name == "US_200496 - Save Reagent (initial setup + replacement)")
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
  if(feature.Name == "US_200496 - Save Reagent (initial setup + replacement)")
  {
    Util_DatabaseHelper.DisconnectDatabase("hfi_consumable");
  }
});

Given("The Barcode {arg} is input and validated correctly", function (theBarcode)
{
  barcode = theBarcode;
});

Given("The Instrument {arg} is input and validated correctly", function (theInstrumentId)
{
  switch (theInstrumentId)
  {
    case "Instrument Id more than 255 characters":
      instrumentId = TheStringIsGenerated;
    break;
    default:
      instrumentId = theInstrumentId;
  }
});

Given("The Container Id {arg} is input and validated correctly", function (theContainerId)
{
  switch (theContainerId)
  {
    case "Container Id more than 255 characters":
      containerId = TheStringIsGenerated;
    break;
    default:
      containerId = theContainerId;
  }
});

Given("The Cycles Remaining {arg} is input and validated correctly", function (theCyclesRemaining)
{
  cyclesRemaining = theCyclesRemaining;
});

Given("The Container Configuration {arg} is input and validated correctly", function (theConfigurationOfReagentSingle)
{
  configurationSingle = theConfigurationOfReagentSingle;
});

When("A valid POST request is sent to the Save Reagent API", function ()
{
  var myJsonBody = 
  {
    "barcode": barcode,
    "instrumentId": instrumentId, 
    "containerId": containerId,
    "cyclesRemaining": cyclesRemaining,
    "containerConfiguration": configurationSingle
  };
  for(let key in myJsonBody)
  {
    if(myJsonBody[key] == "Missing")
    {
      delete myJsonBody[key];
    }
  }  
  resApiSaveReagent = Util_HttpRequest.MethodPost(Util_GLOBAL.SubBaseURLConsumable + SaveReagentEndPoint, myJsonBody);
});

Then("The system saves the reagent successfully and responds with Status Code {arg}", function (theExpectedStatusCode)
{
  Util_Assertion.AssertValuesAreEqual(theExpectedStatusCode, resApiSaveReagent.StatusCode, "Status Code: ", undefined);
});

Given("The Container Id_One {arg} is input and validated correctly", function (theContainerIdOne)
{
  containerIdOne = theContainerIdOne;
});

Given("The Container Id_Two {arg} is input and validated correctly", function (theContainerIdTwo)
{
  containerIdTwo = theContainerIdTwo;
});

Given("The Cycles Remaining_One {arg} is input and validated correctly", function (theCyclesRemainingOne)
{
  cyclesRemainingOne = theCyclesRemainingOne;
});

Given("The Cycles Remaining_Two {arg} is input and validated correctly", function (theCyclesRemainingTwo)
{
  cyclesRemainingTwo = theCyclesRemainingTwo;
});

When("A valid POST request with double valid values is sent to the Save Reagent API", function ()
{
  var myJsonBody = 
  {
    "barcode": barcode,
    "instrumentId": instrumentId,
    "containerId": containerIdOne,
    "containerId": containerIdTwo,
    "cyclesRemaining": cyclesRemainingOne,
    "cyclesRemaining": cyclesRemainingTwo
  };
  if (cyclesRemainingTwo == "Missing")
  {
    myJsonBody = 
    {
      "barcode": barcode,
      "instrumentId": instrumentId,
      "containerId": containerIdOne,
      "containerId": containerIdTwo,
      "cyclesRemaining": cyclesRemainingOne
    };
  }
  else if (containerIdTwo == "Missing")
  {
    myJsonBody = 
    {
      "barcode": barcode,
      "instrumentId": instrumentId,
      "containerId": containerIdOne,
      "cyclesRemaining": cyclesRemainingOne,
      "cyclesRemaining": cyclesRemainingTwo
    };
  }
  resApiSaveReagent = Util_HttpRequest.MethodPost(Util_GLOBAL.SubBaseURLConsumable + SaveReagentEndPoint, myJsonBody);
});

Given("The Barcode {arg} is invalid barcode", function (theBarcodeInvalid)
{
  switch (theBarcodeInvalid)
  {
    case "Reagent Manufacturer more than 255 characters":
      barcodeInvalid = "+H62" + TheStringIsGenerated + "6280221H2320613222271189H70458H";
    break;
    case "Reagent Lot Number more than 255 characters":
      barcodeInvalid = "+H6286280811H232061322" + TheStringIsGenerated + "K17123H";
    break;
    case "Bottle Sequence Number more than 255 characters":
      barcodeInvalid = "+H6286280211H2320614222198420L3" + TheStringIsGenerated + "H";
    case "Reagent Type ID more than 255 characters":
      barcodeInvalid = "+H6286280211H2332206158447704" + TheStringIsGenerated + "55764H";
    default:
      barcodeInvalid = theBarcodeInvalid;
  }
});

When("A valid POST request with Barcode Invalid is sent to the Save Reagent API", function ()
{
  var myJsonBody = 
  {
    "barcode": barcodeInvalid,
    "instrumentId": instrumentId,
    "containerId": containerId,
    "cyclesRemaining": cyclesRemaining
  };
  for(var key in myJsonBody)
  {
    if(myJsonBody[key]== "Missing")
    {
      delete myJsonBody[key]
    }
  }  
  resApiSaveReagent = Util_HttpRequest.MethodPost(Util_GLOBAL.SubBaseURLConsumable + SaveReagentEndPoint, myJsonBody);
});

Then("The system saves the reagent unsuccessfully and responds with Error Code {arg}", function (theExpectedErrorCode)
{
  Util_Assertion.AssertValuesAreEqual(theExpectedErrorCode, Util_Helper.ToJSON(resApiSaveReagent.Text).error.details[0].code, "Error Code: ", undefined);
});