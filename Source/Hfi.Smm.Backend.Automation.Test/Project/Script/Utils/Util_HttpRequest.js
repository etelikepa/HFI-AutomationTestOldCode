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

//USEUNIT Util_GLOBAL
  
/// <summary> 
/// Method GET request to get data.  
/// </summary> 
/// <param name="theEndPoint">[string]The Endpoint of the API that is accessing</param> 
function MethodGet (theEndPoint)
{
  var myRequest;
  myRequest = aqHttp.CreateGetRequest(Util_GLOBAL.BaseUrl + Util_GLOBAL.PortBaseUrl + theEndPoint);
  myResponse = myRequest.Send();
  return myResponse;
}

/// <summary> 
/// Method POST request to post data.  
/// </summary> 
/// <param name="theEndPoint">[string]The Endpoint of the API that accessing</param> 
/// <param name="theBody">[Json format]The Body contains the content of data that will be posted</param> 
function MethodPost (theEndPoint, theBody) 
{
  var myRequest;
  myRequest = aqHttp.CreatePostRequest(Util_GLOBAL.BaseUrl + Util_GLOBAL.PortBaseUrl + theEndPoint);
  myRequest.SetHeader("Content-Type", "application/json");
  myResponse = myRequest.Send(JSON.stringify(theBody));
  return myResponse;
}
  
/// <summary> 
/// Method PUT request to update/modify data.  
/// </summary> 
/// <param name="theEndPoint">[string]The Endpoint of the API that accessing</param> 
/// <param name="theBody">[Json format]The Body contains the content of data that will be changed</param> 
function MethodPut (theEndPoint, theBody) 
{
  var myRequest;
  myRequest = aqHttp.CreateRequest("PUT", Util_GLOBAL.BaseUrl + Util_GLOBAL.PortBaseUrl + theEndPoint);
  myRequest.SetHeader("Content-Type", "application/json");
  myResponse = myRequest.Send(JSON.stringify(theBody));
  return myResponse;
}
  
/// <summary> 
/// Method PATCH request to update/modify data. 
/// </summary> 
/// <param name="theEndPoint">[string]The Endpoint of the API that accessing</param> 
/// <param name="theBody">[Json format]The Body contains the content of data that will be changed</param>
function MethodPatch (theEndPoint, theBody) 
{
  var myRequest;
  myRequest = aqHttp.CreateRequest("PATCH", Util_GLOBAL.BaseUrl + Util_GLOBAL.PortBaseUrl + theEndPoint);
  myRequest.SetHeader("Content-Type", "application/json");
  myResponse = myRequest.Send(JSON.stringify(theBody));
  return myResponse;
}
  
/// <summary> 
/// Method DELETE request to delete data.  
/// </summary> 
/// <param name="theEndPoint">[string]The Endpoint of the API that accessing</param> 
function MethodDelete (theEndPoint) 
{
  var myRequest;
  myRequest = aqHttp.CreateRequest("DELETE", Util_GLOBAL.BaseUrl + Util_GLOBAL.PortBaseUrl + theEndPoint);
  myResponse = myRequest.Send();
  return myResponse;
}