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
var myBarcodeConvert;

Given("Invalid barcode", function ()
{
  Util_Assertion.Skip("Barcode is invalid.", undefined);
});
  
When("A GET request without barcode is send to The Reagent Setup API", function ()
{
  myBarcodeConvert = Util_Helper.ConvertEncodeUrl(" ");
  restApiGetReagent = Util_HttpRequest.MethodGet(Util_GLOBAL.SubBaseURLConsumable + GetReagentEndPoint + myBarcodeConvert);
});

Then("The Reagent Setup API will respond with Status Code {arg}", function (theExpectedStatus)
{
   Util_Assertion.AssertValuesAreEqual(theExpectedStatus, restApiGetReagent.StatusCode, "Status Code: ", undefined);
});

Then("The Reagent Setup API will respond with Error Code {arg}", function (theExpectedErrorCode)
{
  Util_Assertion.AssertValuesAreEqual(theExpectedErrorCode, Util_Helper.ToJSON(restApiGetReagent.Text).error.details[0].code, "Error Code: ", undefined);
});
    
Then("The Reagent Setup API will respond with Message {arg}", function (theExpectedMsg)
{
  Util_Assertion.AssertValuesAreEqual(theExpectedMsg, Util_Helper.ToJSON(restApiGetReagent.Text).error.details[0].message, "Error Message: ", undefined);
});
  
When("A GET request with {arg} is sent to the Reagent Setup API", function (theBarcode)
{
  myBarcodeConvert = Util_Helper.ConvertEncodeUrl(theBarcode);
  restApiGetReagent = Util_HttpRequest.MethodGet(Util_GLOBAL.SubBaseURLConsumable + GetReagentEndPoint + myBarcodeConvert);
});
  
When("A GET request with {arg} start with space is sent to the Reagent Setup API", function (theBarcode)
{
  myBarcodeConvert = Util_Helper.ConvertEncodeUrl(theBarcode);
  restApiGetReagent = Util_HttpRequest.MethodGet(Util_GLOBAL.SubBaseURLConsumable + GetReagentEndPoint + myBarcodeConvert);
});
  
When("A GET request with {arg} end with space is sent to the Reagent Setup API", function (theBarcode)
{
  myBarcodeConvert = Util_Helper.ConvertEncodeUrl(theBarcode);
  restApiGetReagent = Util_HttpRequest.MethodGet(Util_GLOBAL.SubBaseURLConsumable + GetReagentEndPoint + myBarcodeConvert);
});