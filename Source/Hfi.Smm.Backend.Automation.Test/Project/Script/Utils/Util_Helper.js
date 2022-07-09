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

/// <summary>
/// Returns the object from a given file have JSON format.
/// </summary>
/// <param name=theFile>The any file.</param>
function FileToJSON (theFile)
{
  var path = aqFileSystem.ExpandFileName(theFile);
  return ToJSON(ReadWholeTextFile(path));
}

/// <summary>
/// Returns the JavaScript object from a given String.
/// </summary>
/// <param name=theInput>The given item.</param>
function ToJSON (theInput)
{ 
  if (Util_Assertion.IsEmpty(theInput) == true)
  {
    LogErrorAndStopTestCase("The input to be converted to Json is empty!");
  }
  var convertedToJSON = JSON.parse(theInput);
  return convertedToJSON;
}

/// <summary>
/// Returns the string version from a given object.
/// </summary>
/// <param name=theObject>The given object.</param>
function ToString (theObject)
{
  var string = undefined;
  if ( typeof (theObject) == "object" )
  {
    // For non-array objects we use their JSON representation.
    if ( theObject.length == undefined )
    {
      string = ToJSON(theObject);
    }
    // For array objects we use put its elements in brackets.
    else
    {
      string = "[";
      var firstElement = true;
      for ( var i = 0; i < theObject.length; i++ )
      {
        if ( !firstElement )
        {
          string += ", ";
        }
        else
        {
          firstElement = false;
        }

        string += ToString(theObject[i]);
      }
      string += "]";
    }
  }
  else if ( typeof (theObject) == "string" )
  {
    // For strings we surround them with quotes.
    string = "\"" + theObject.toString() + "\"";
  }
  else
  {
    // For anything else we just create its string version.
    string = new String(theObject);
  }
  return string;
}

/// <summary>
/// Returns the JavaScript object from a given String.
/// </summary>
/// <param name=theString>The given string.</param>
function ToBoolean (theString)
{ 
  if (Util_Assertion.IsEmpty(theString) == true)
  {
    LogErrorAndStopTestCase("The input is empty!");
  }
  return aqConvert.VarToBool(theString);
}

/// <summary>
/// Returns the string version from a given object.
/// </summary>
/// <param name=thePath>The given path.</param>
function ReadWholeTextFile (thePath)
{
  var fullPath = aqFileSystem.ExpandFileName(thePath);
  // Make sure the path exists.
  if(!aqFile.Exists(fullPath))
  {
    LogErrorAndStopTestCase("ReadWholeTextFile: Path not found: " + fullPath);
  }
  // Read the file and return.
  var content = aqFile.ReadWholeTextFile(fullPath, aqFile.ctUTF8);
  return content;
}

/// <summary>
/// Delete file if exists.
/// <summary>
/// <param name=theFile>The give file path.</param>
function DeleteFileIfExists (theFile)
{
  if ( aqFile.Exists(theFile) )
  {
    var success = undefined;
    var tries = 30;
    for ( var i = 0; i < tries; i++ )
    {
      success = aqFile.Delete(theFile);
      if ( success )
      {
        break;
      }
      aqUtils.Delay(1000,  + "DeleteFileIfExists: Waiting for file to unlock.");
    }
    if ( !success )
    {
      LogErrorAndStopTestCase("Could not delete file: " + theFile);
    }
  }
}

/// <summary>
/// Finds a value in a given array.
/// <summary>
/// <param name=theArray>The given array.</param>
/// <param name=theValue>The value.</param>
/// <returns>The index of the element if found. undefined otherwise.</returns>
function FindInArray (theArray, theValue)
{
  var foundIndex = undefined;
  if ( theArray != undefined )
  {
    for ( var i = 0; i < theArray.length; i++ )
    {
      if ( theArray[i] == theValue )
      {
        foundIndex = i;
        break;
      }
    }
  }
  return foundIndex;
}

/// <summary>
/// Logs an error and stops the test case.
/// </summary>
/// <param name=theMessage>The error message.</param>
function LogErrorAndStopTestCase (theMessage)
{
  Log.Error(theMessage, undefined, undefined, undefined, undefined);
  throw new Error(theMessage);
  Project.TestItems.Current.StopOnError;
}

/// <summary>
/// Converts the source time to the specified format.
/// </summary>
/// <param name="theSourceTime">The string value of the time that is to be formatted.</param>
/// <param name="theTimeFormat">The name of the desired time format:
///   "12hhmmtt", "12hhmmsstt", "24hhmm", "24hhmmss" </param>
/// <returns>The string value of the formatted time.</returns>
function ConvertTimeFormat (theSourceTime, theTimeFormat)
{
  var time = undefined;
  try
  {
    // This is need because the DateTimeToFormatStr method will throw an exception if the date portion is not set.
    // An arbitary date after 1900 is needed. 
    var dateTime = aqConvert.StrToDateTime("01/01/2012 " + theSourceTime);
    time = aqConvert.DateTimeToFormatStr(dateTime, UIGlobalConstants.TimeFormats[theTimeFormat].String);
  }
  catch ( exception )
  {
    Log.Error("Exception", exception.description);
  }
  return time;
}

/// <summary>
/// Send command to Command Prompt.
/// </summary>
/// <param name="WshShellExecObj">[string] The string run cmd.exe.</param>
/// <param name="theCommand">[string] The command sent to Cmd.</param>
function SendCommand (WshShellExecObj, theCommand)
{
  if (WshShellExecObj != null)
  {
    WshShellExecObj.StdIn.Write(theCommand + "\n");
  }
}

/// <summary>
/// Generate an UUID string to format string
/// </summary>
/// <param name="theId">[string] The UUID string.</param>
function GetUuidFormat (theId)
{
  if (Util_Assertion.IsEmpty(theId) == true)
  {
    LogErrorAndStopTestCase("The input string is empty.");
  }
  var myFormatString = theId;
  for(var i = 0; i < theId.length; i++)
  {
    if(aqString.Compare(theId.charAt(i), "-", false) == 1)
    {
      myFormatString = aqString.Replace(myFormatString, theId.charAt(i), "X");
    }
  }
  return myFormatString;
}

/// <summary>
/// Covert to encode url
/// </summary>
/// <param name="theInput">[string] The string need covert to url encode.</param>
function ConvertEncodeUrl (theInput)
{
  return dotNET.BeckmanCoulter_DxH_Hfi_Backend_Automation_Test_Support_CommonHelper.CommonHelper.CovertUrlEncode(theInput);
}

/// <summary>
/// Get current date time
/// </summary>
/// <param name="theFormatTime">[string] The format for current date time received.</param>
function GetCurrentTimeUTC (theFormatTime)
{
  return dotNET.BeckmanCoulter_DxH_Hfi_Backend_Automation_Test_Support_CommonHelper.CommonHelper.GetCurrentTime(theFormatTime);
}

/// <summary>
/// Generate the string charaters.
/// </summary>
/// <param name="theLength">[let] The limit of string is generated.</param>
function GenerateString(theLength)
{
  const myCharacters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let myResult = ' ';
  const myCharactersLength = myCharacters.length;
  for (let i = 0; i < theLength; i++)
  {
    myResult += myCharacters.charAt(Math.floor(Math.random() * myCharactersLength));
  }
  return myResult;
}
