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

var restApiGetReagent;
var respondedDataJson;
var myBarcodeConvert;

When("A valid GET request with {arg} is sent to the Reagent API", function(theBarcode)
{
  myBarcodeConvert = Util_Helper.ConvertEncodeUrl(theBarcode);
  restApiGetReagent = Util_HttpRequest.MethodGet(Util_GLOBAL.SubBaseURLConsumable + "/reagents/" + myBarcodeConvert);
  respondedDataJson = Util_Helper.ToJSON(restApiGetReagent.Text).data.reagent;
});
  
Then("The Reagent API will respond with Status Code {arg}", function (theExpectedStatus)
{
  Util_Assertion.AssertValuesAreEqual(theExpectedStatus, restApiGetReagent.StatusCode, "Status Code: ", undefined);
});
  
Then("The {arg}: {arg} will have the correct value", function (theProperty, theExpectedValue)
{
  myPropertyValue = aqObject.GetPropertyValue(respondedDataJson, theProperty);
  Util_Assertion.AssertValuesAreEqual(theExpectedValue, myPropertyValue, "Property Value: ", undefined);
});
  
Then("The isExpired flag will have the correct value", function ()
{
  var myOpenedDate = dotNET.System.DateTime.Parse(Util_Helper.ToJSON(restApiGetReagent.Text).data.reagent.dateOpened);
  var myUseBeforeDate = dotNET.System.DateTime.Parse(Util_Helper.ToJSON(restApiGetReagent.Text).data.reagent.useBeforeDate);
  var myExpectedExpStatus;
  if(dotNET.System.DateTime.Compare(myOpenedDate, myUseBeforeDate) == 1)
  {
    myExpectedExpStatus = true;
  }
  else
  {
    myExpectedExpStatus = false;
  }
  Util_Assertion.AssertValuesAreEqual(myExpectedExpStatus, Util_Helper.ToJSON(restApiGetReagent.Text).data.reagent.isExpired, "IsExpired Flag: ", undefined);
});