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
var GetReagentEndPoint = "/reagents/";
var restApiGetReagent;
var resApiSaveReagent;
var IcmSimulationConnection;
var ConsumableConnection;
// The string is generated random 256 characters.
var theRandomlyGeneratedString = Util_Helper.GenerateString(256);
    
// Function save Reagent successfully.
function SaveReagentSuccessfully (theBarcode, theInstrumentId, theContainerId, theCyclesRemaining, theConfiguration)
{
  var myJsonBody = 
  {
    "barcode": theBarcode,
    "instrumentId": theInstrumentId, 
    "containerId": theContainerId,
    "cyclesRemaining": theCyclesRemaining,
    "containerConfiguration": theConfiguration
  };
  for(let key in myJsonBody)
  {
    if(myJsonBody[key] == "Missing")
    {
      delete myJsonBody[key];
    }
  }
  resApiSaveReagent = Util_HttpRequest.MethodPost(Util_GLOBAL.SubBaseURLConsumable + SaveReagentEndPoint, myJsonBody);
};

// Function save Reagent successfully with double valid values is input.
function SaveReagentSuccessfullyInputDoubleValidValues (theBarcode, theInstrumentId, theContainerIdOne, theContainerIdTwo, theCyclesRemainingOne, theCyclesRemainingTwo)
{
  var myJsonBody = 
  {
    "barcode": theBarcode,
    "instrumentId": theInstrumentId,
    "containerId": theContainerIdOne,
    "containerId": theContainerIdTwo,
    "cyclesRemaining": theCyclesRemainingOne,
    "cyclesRemaining": theCyclesRemainingTwo
  };
  switch ("Missing")
  {
    case theCyclesRemainingTwo:
      myJsonBody = 
      {
        "barcode": theBarcode,
        "instrumentId": theInstrumentId,
        "containerId": theContainerIdOne,
        "containerId": theContainerIdTwo,
        "cyclesRemaining": theCyclesRemainingOne
      };
    break;
    case theContainerIdTwo:
      myJsonBody = 
      {
        "barcode": theBarcode,
        "instrumentId": theInstrumentId,
        "containerId": theContainerIdOne,
        "cyclesRemaining": theCyclesRemainingOne,
        "cyclesRemaining": theCyclesRemainingTwo
      };
    break;
  }
  resApiSaveReagent = Util_HttpRequest.MethodPost(Util_GLOBAL.SubBaseURLConsumable + SaveReagentEndPoint, myJsonBody);
};

Given("The Barcode {arg} is input and validated correctly", function (theBarcode)
{
  barcode = theBarcode;
});

Given("The Instrument {arg} is input and validated correctly", function (theInstrumentId)
{
  switch (theInstrumentId)
  {
    case "Instrument Id more than 255 characters":
      instrumentId = theRandomlyGeneratedString;
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
      containerId = theRandomlyGeneratedString;
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
  IcmSimulationConnection = Util_DatabaseHelper.ConnectDatabase("IcmSimulation", "postgres", "postgres");
  Util_DatabaseHelper.QueryToEdit(IcmSimulationConnection, "update \"ICMDevice\" set \"Status\"= 'Off'::text where \"DeviceId\" = 'Instrument';");
  Util_DatabaseHelper.DisconnectDatabase(IcmSimulationConnection);
  restApiGetReagent = Util_HttpRequest.MethodGet(Util_GLOBAL.SubBaseURLConsumable + GetReagentEndPoint + barcode);    
  var myIsExisted = new Boolean(Util_Helper.ToJSON(restApiGetReagent.Text).data.isExisted);
  if(myIsExisted != Util_Helper.ToBoolean("True"))
  {
    SaveReagentSuccessfully(barcode, instrumentId, containerId, cyclesRemaining, configurationSingle);
  }
  else
  {
    ConsumableConnection = Util_DatabaseHelper.ConnectDatabase("hfi_consumable", "postgres", "postgres");
    Util_DatabaseHelper.QueryToEdit(ConsumableConnection, "delete from reagent where barcode = '" + barcode + "';");
    Util_DatabaseHelper.DisconnectDatabase(ConsumableConnection);
    SaveReagentSuccessfully(barcode, instrumentId, containerId, cyclesRemaining, configurationSingle);
  }
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
  IcmSimulationConnection = Util_DatabaseHelper.ConnectDatabase("IcmSimulation", "postgres", "postgres");
  Util_DatabaseHelper.QueryToEdit(IcmSimulationConnection, "update \"ICMDevice\" set \"Status\"= 'Off'::text where \"DeviceId\" = 'Instrument';");
  Util_DatabaseHelper.DisconnectDatabase(IcmSimulationConnection);
  restApiGetReagent = Util_HttpRequest.MethodGet(Util_GLOBAL.SubBaseURLConsumable + GetReagentEndPoint + barcode);    
  var myIsExisted = new Boolean(Util_Helper.ToJSON(restApiGetReagent.Text).data.isExisted); 
  
  if(myIsExisted != Util_Helper.ToBoolean("True"))
  {
    SaveReagentSuccessfullyInputDoubleValidValues(barcode, instrumentId, containerIdOne, containerIdTwo, cyclesRemainingOne, cyclesRemainingTwo);
  }
  else
  {
    ConsumableConnection = Util_DatabaseHelper.ConnectDatabase("hfi_consumable", "postgres", "postgres");
    Util_DatabaseHelper.QueryToEdit(ConsumableConnection, "delete from reagent where barcode = '" + barcode + "';");
    Util_DatabaseHelper.DisconnectDatabase(ConsumableConnection);
    SaveReagentSuccessfullyInputDoubleValidValues(barcode, instrumentId, containerIdOne, containerIdTwo, cyclesRemainingOne, cyclesRemainingTwo);
  }
});

Given("The Barcode {arg} is invalid barcode", function (theBarcodeInvalid)
{
  switch (theBarcodeInvalid)
  {
    case "Reagent Manufacturer more than 255 characters":
      barcodeInvalid = "+H62" + theRandomlyGeneratedString + "6280221H2320613222271189H70458H";
    break;
    case "Reagent Lot Number more than 255 characters":
      barcodeInvalid = "+H6286280811H232061322" + theRandomlyGeneratedString + "K17123H";
    break;
    case "Bottle Sequence Number more than 255 characters":
      barcodeInvalid = "+H6286280211H2320614222198420L3" + theRandomlyGeneratedString + "H";
    case "Reagent Type ID more than 255 characters":
      barcodeInvalid = "+H6286280211H2332206158447704" + theRandomlyGeneratedString + "55764H";
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