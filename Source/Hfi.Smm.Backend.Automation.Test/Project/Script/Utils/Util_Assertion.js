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
//USEUNIT Util_Helper
//USEUNIT Util_Utility

/// <summary>
/// A boolean that indicates whether to invert all the assertions.
/// </summary>
/// <remarks>
/// Set this value to 'true' to demonstrate that your test cases are properly failing.
/// </remarks>
var InvertAllAssertions = false;

/// <summary>
/// Last Verify tag.
/// </summary>
var LastVerifyTag = undefined;

/// <summary>
/// Verify number.
/// </summary>
var VerifyNumber = undefined;

/// <summary>
/// Array to log assertion Errors.
/// </summary>
var AssertionErrorLog = [];

/// <summary>
/// Array to log assertion Messages.
/// </summary>
var AssertionMessageLog = [];

/// <summary>
/// Resets the Error and Message logs to their default value.
/// </summary>
function ResetLogs ()
{
  AssertionErrorLog = [];
  AssertionMessageLog = [];
}

/// <summary>
/// Evaluates a given assertion result.
/// </summary>
/// <param name="theAssertion">The given assertion result.</param>
/// <param name="theActualObjectName">The actual object name.</param>
/// <param name="theExpectedValue">The expected value string.</param>
/// <param name="theActualValue">The actual value string.</param>
/// <param name="theVerifyTag">The verify tag.</param>
function EvaluateAssertionResult (theAssertion, theActualObjectName, theExpectedValue, theActualValue, theVerifyTag)
{
  var fullMessage = theActualObjectName + ": <expected>" + theExpectedValue + ", <actual>" + theActualValue;
  
  // Check the InvertAllAssertions flag to determine whether to invert assertion logic
  theAssertion = (!InvertAllAssertions ? (theAssertion) : (!theAssertion));
  theAssertion ? Pass(fullMessage, theVerifyTag) : Fail(fullMessage, theVerifyTag);
}

/// <summary>
/// Assertion success.
/// </summary>
/// <param name="theMessage">The message.</param>
/// <param name="theVerifyTag">The verify tag.</param>
/// <param name="theAdditionalInfo">The additional info to log.</param>
function Pass (theMessage, theVerifyTag)
{
  var message = AddPrefix("PASS: " + theMessage, theVerifyTag);
  AssertionMessageLog.push(message);
}

/// <summary>
/// Assertion failure.
/// </summary>
/// <param name="theMessage">The message.</param>
/// <param name="theVerifyTag">The verify tag.</param>
/// <param name="theAdditionalInfo">The additional info to log.</param>
function Fail (theMessage, theVerifyTag)
{
  var message = AddPrefix("FAIL: " + theMessage, theVerifyTag);
  AssertionErrorLog.push(message);
  Log.Error(message, undefined, undefined, undefined, undefined);
}

/// <summary>
/// Assertion skipped. Ex. Verify step is deleted.
/// </summary>
/// <param name="theMessage">The explanation of why verification point was skipped.</param>
/// <param name="theVerifyTag">The verify tag.</param>
function Skip (theMessage, theVerifyTag)
{
  var message = AddPrefix("SKIP: " + theMessage, theVerifyTag);
  AssertionMessageLog.push(message);
  Log.Message(message);
}

/// <summary>
/// Add the prefix to a given message.
/// </summary>
/// <param name="theMessage">The message.</param>
/// <param name="theVerifyTag">The verify tag.</param>
/// <returns>The message with verify label prefix.</returns>
function AddPrefix (theMessage, theVerifyTag)
{
  var message = theMessage;
  if ( theVerifyTag != undefined )
  {
    // Update the Verify number.
    if ( theVerifyTag != LastVerifyTag )
    {
      LastVerifyTag = theVerifyTag;
      VerifyNumber = 1;
    }
    else
    {
      VerifyNumber++;
    }
    message = VerifyLabel(theVerifyTag) + " [" + VerifyNumber + "] - " + message;
  }
  return message;
}

/// <summary>
/// Returns the verify label.
/// </summary>
/// <param name="theVerifyTag">The verify tag.</param>
/// <returns>The verify label</returns>  
function VerifyLabel (theVerifyTag)
{
  var verifyLabel = "VERIFY " + theVerifyTag;
  return verifyLabel;
}

/// <summary>
/// Handler for the OnStartTest event.
/// </summary>
function OnStartTest ()
{
  // Clear the last Verify tag.
  LastVerifyTag = undefined;
  
  // Reset logs.
  ResetLogs();
}

/// <summary>
/// Asserts that a given actual value is equal to a given expected value.
/// If the value of the Actual parameter is 'N/A' then the assertion will be passed
/// automatically.
/// </summary>
/// <param name="theExpected">The given expected value.</param>
/// <param name="theActual">The given actual value.</param>
/// <param name="theActualObjectName">The actual object name.</param>
/// <param name="theVerifyTag">The verify tag.</param>
function AssertValuesAreEqual (theExpected, theActual, theActualObjectName, theVerifyTag)
{
  var assertion = (theExpected == theActual);
  var expectedValueString = "=" + Util_Helper.ToString(theExpected);
  var actualValueString = Util_Helper.ToString(theActual);
  
  // if the Actual is 'N/A' then it means that the field/object being verified
  // was explicitly set to be ignored. Probably because it does not exist and
  // we do not need it in this case.
  if ( theActual == "N/A" )
  {
    assertion = true;
    expectedValueString = " Skipped";
  }
  EvaluateAssertionResult(assertion, theActualObjectName, expectedValueString, actualValueString, theVerifyTag);
}

/// <summary>
/// Asserts that a given actual value is Not equal to a given expected value.
/// If the value of the Actual parameter is 'N/A' then the assertion will be passed
/// automatically.
/// </summary>
/// <param name="theExpected">The given expected value.</param>
/// <param name="theActual">The given actual value.</param>
/// <param name="theActualObjectName">The actual object name.</param>
/// <param name="theVerifyTag">The verify tag.</param>
function AssertValuesAreNotEqual (theExpected, theActual, theActualObjectName, theVerifyTag)
{
  var assertion = (theExpected != theActual);
  var expectedValueString = "!=" + Util_Helper.ToString(theExpected);
  var actualValueString = Util_Helper.ToString(theActual);
  
  // if the Actual is 'N/A' then it means that the field/object being verified
  // was explicitly set to be ignored. Probably because it does not exist and
  // we do not need it in this case.
  if ( theActual == "N/A" )
  {
    assertion = true;
    expectedValueString = " Skipped";
  }
  EvaluateAssertionResult(assertion, theActualObjectName, expectedValueString, actualValueString, theVerifyTag);
}

/// <summary>
/// Asserts that a given expected string is contained in a given actual string.
/// </summary>
/// <param name="theExpected">The given expected value.</param>
/// <param name="theActual">The given actual value.</param>
/// <param name="theActualObjectName">The actual object name.</param>
/// <param name="theVerifyTag">The verify tag.</param>
function AssertStringContains (theExpected, theActual, theActualObjectName, theVerifyTag)
{
  var index = aqString.Find(theActual, theExpected);
  var assertion = (index >= 0);
  var expectedValueString = "contains \"" + theExpected + "\"";
  var actualValueString = new String(theActual);
  EvaluateAssertionResult(assertion, theActualObjectName, expectedValueString, actualValueString, theVerifyTag);
}

/// <summary>
/// Asserts that a given actual string is a subset of a given expected string.
/// </summary>
/// <param name="theExpected">The given expected value.</param>
/// <param name="theActual">The given actual value.</param>
/// <param name="theActualObjectName">The actual object name.</param>
/// <param name="theVerifyTag">The verify tag.</param>
function AssertStringIsSubset (theExpected, theActual, theActualObjectName, theVerifyTag)
{
  var index = aqString.Find(theExpected, theActual);
  var assertion = (index >= 0);
  var expectedValueString = "subset of \"" + theExpected + "\"";
  var actualValueString = new String(theActual);
  EvaluateAssertionResult(assertion, theActualObjectName, expectedValueString, actualValueString, theVerifyTag);
}

/// <summary>
/// Asserts that a given expected object is equal to a given actual object.
/// </summary>
/// <param name="theExpected">The given expected value.</param>
/// <param name="theActual">The given actual value.</param>
/// <param name="theActualObjectName">The actual object name.</param>
/// <param name="theVerifyTag">The verify tag.</param>
/// <param name="theCheckForExtraPropertiesFlag">(boolean, optional) Check for properties that don't exist in theExpected that do exist in theActual. Default: true.</param>
function AssertObjectsAreEqual (
  theExpected,
  theActual,
  theActualObjectName,
  theVerifyTag,
  theCheckForExtraPropertiesFlag)
{
  theCheckForExtraPropertiesFlag = Util_Utility.SafeArgument(theCheckForExtraPropertiesFlag, true);
  
  // Return early if one of the objects is undefined.
  if ( (theExpected == undefined) || (theActual == undefined) || (theExpected == null) || (theActual == null) )
  {
    AssertValuesAreEqual(theExpected, theActual, theActualObjectName, theVerifyTag);
    return;
  }
  var type = typeof (theExpected);
  switch ( type )
  {
    case "number":
    case "string":
    case "boolean":
      AssertValuesAreEqual(theExpected, theActual, theActualObjectName, theVerifyTag);
      break;
    case "object":
      // If the expected object is a picture object.
      if ( aqObject.IsSupported(theExpected, "Pixels") )
      {
        AssertPicturesAreEqual(theExpected, theActual, theActualObjectName, theVerifyTag);
      }
      else
      {
        // Check for empty objects.
        if ( IsObjectEmpty(theExpected) && IsObjectEmpty(theActual) )
        {
          var assertion = true;
          EvaluateAssertionResult(assertion, theActualObjectName, "=empty", "empty", theVerifyTag);
        }
        else
        {
          // Make sure the actual object has all the properties
          // from the expected object.
          for ( var property in theExpected )
          {
            var expected = theExpected[property];
            var actual = theActual[property];
            AssertObjectsAreEqual(expected,
                                  actual,
                                  [theActualObjectName, property].join("."),
                                  theVerifyTag,
                                  theCheckForExtraPropertiesFlag);
          }
          // Check for extra properties.
          for ( var property in theActual )
          {
            var content = theActual[property];
            var contentType = typeof (content);
            
            // Ignore if the content type is a function
            if ( contentType == "function" )
            {
              continue;
            }
            if ( theCheckForExtraPropertiesFlag == true )
            {
              if ( (theActual[property] != undefined) && (theExpected[property] == undefined) )
              {
                Fail(theActualObjectName + " has extra property: " + property + ": "
                  + Util_Helper.ToString(theActual[property]), theVerifyTag);
              }
            }
          }
        }
      }
      break;
    default:
      Fail("Unsupported '" + type + "' type for object: " + theActualObjectName, theVerifyTag);
  }
}

/// <summary>
/// Asserts that a given actual collection contains a given expected value.
/// </summary>
/// <param name="theExpectedValue">The given expected value.</param>
/// <param name="theActualCollection">The given actual collection.</param>
/// <param name="theActualObjectName">The actual object name.</param>
/// <param name="theVerifyTag">The verify tag.</param>
/// <returns>The index of the found item in the collection, undefined otherwise.</returns>
function AssertCollectionContainsValue (theExpectedValue, theActualCollection, theActualObjectName, theVerifyTag)
{
  theActualCollection = Util_Utility.SafeCollection(theActualCollection);
  var foundIndex = Util_Utility.FindInArray(theActualCollection, theExpectedValue);
  var assertion = (foundIndex != undefined);
  var expectedValueString = "contains " + new String(theExpectedValue);
  EvaluateAssertionResult(assertion,
                          theActualObjectName,
                          expectedValueString,
                          theActualCollection.Util_Helper.ToString(),
                          theVerifyTag);
  return foundIndex;
}

/// <summary>
/// Asserts that a given actual object or string is not empty.
/// </summary>
/// <param name="theActual">The given actual value.</param>
/// <param name="theActualObjectName">The actual object name.</param>
/// <param name="theVerifyTag">The verify tag.</param>
function AssertNotEmpty (theActual, theActualObjectName, theVerifyTag)
{
  var assertion = false;
  var actualText = "undefined";
  if ( theActual != undefined )
  {
    actualText = "empty";
    if ( typeof (theActual) == "object" )
    {
      // If there is any property then it is not empty.
      for ( var property in theActual )
      {
        actualText = "not empty";
        assertion = true;
        break;
      }
    }
    else
    {
      if ( theActual != "" )
      {
        actualText = "not empty";
        assertion = true;
      }
    }
  }
  EvaluateAssertionResult(assertion, theActualObjectName, "not empty", actualText, theVerifyTag);
}

/// <summary>
/// Asserts that a given actual number is less or equal to a given expected number.
/// </summary>
/// <param name="theExpected">The given expected value.</param>
/// <param name="theActual">The given actual value.</param>
/// <param name="theActualObjectName">The actual object name.</param>
/// <param name="theVerifyTag">The verify tag.</param>
function AssertNumberIsLessOrEqual (theExpected, theActual, theActualObjectName, theVerifyTag)
{
  var assertion = false;
  var expectedValueString = Util_Helper.ToString(theExpected);
  var actualValueString = Util_Helper.ToString(theActual);

  // Only use numeric expected values.
  var expected = Util_Utility.GetNumericValue(theExpected);
  if ( expected != undefined )
  {
    expectedValueString = expected.Util_Helper.ToString();

    // Only use numeric actual values.
    var actual = Util_Utility.GetNumericValue(theActual);
    if ( actual != undefined )
    {
      actualValueString = actual.Util_Helper.ToString();

      // Set the assertion boolean.
      assertion = (actual <= expected);
    }
  }

  // Evaluate the assertion.
  EvaluateAssertionResult(assertion, theActualObjectName, " <= " + expectedValueString, actualValueString, theVerifyTag);
}

/// <summary>
/// Returns a boolean indicating whether a given object is empty (has no properties).
/// <summary>
/// <param name="theObject">The given object.</param>
function IsObjectEmpty (theObject)
{
  var isEmpty = true;
  for ( var property in theObject )
  {
    isEmpty = false;
    break;
  }
  return isEmpty;
}

/// <summary>
/// <c>IsEmpty</c>
/// Checks if the string is empty
/// </summary>
/// <param name="theString">(String) The string</param>
/// <returns>Returns true if empty otherwise false</returns>
function IsEmpty (theString)
{
  return (theString == undefined || theString == null || theString == "" || typeof (theString) != "string");
}

/// <summary>
/// Compare Expected DateTime with Actual DatTime error was five seconds.
/// <summary>
/// <param name="theExpectedDateTime">[DateTime]The expected DateTime.</param>
/// <param name="theActualDateTime">[DateTime]The actual DateTime.</param>
function CompareDateTimeErrorWasThreeSeconds (theExpectedDateTime, theActualDateTime)
{
  var myIsCompareDateTime = false;
  var myExpectedDateTimeFormatToString = aqConvert.DateTimeToFormatStr(theExpectedDateTime, "%Y-%m-%dT%H:%M:%SZ");
  // The string is sliced to specified character position.
  var myExpectedDate = myExpectedDateTimeFormatToString.slice(0, 10);
  var myExpectedHour = aqConvert.StrToInt(myExpectedDateTimeFormatToString.slice(11, 13));
  var myExpectedMinutes = aqConvert.StrToInt(myExpectedDateTimeFormatToString.slice(14, 16));
  var myExpectedSeconds = aqConvert.StrToInt(myExpectedDateTimeFormatToString.slice(17, 19));
  
  var myActualDateTimeFormatToString = aqConvert.DateTimeToFormatStr(theActualDateTime, "%Y-%m-%dT%H:%M:%SZ");
  // The string is sliced to specified character position.
  var myActualDate = myActualDateTimeFormatToString.slice(0, 10);
  var myActualHour = aqConvert.StrToInt(myActualDateTimeFormatToString.slice(11, 13));
  var myActualMinutes = aqConvert.StrToInt(myActualDateTimeFormatToString.slice(14, 16));
  var myActualSeconds = aqConvert.StrToInt(myActualDateTimeFormatToString.slice(17, 19));
  
  // The hour difference.
  var myHourDifference = myExpectedHour - myActualHour;
  // The minutes difference.
  var myMinutesDifference = myExpectedMinutes - myActualMinutes;
  // The seconds difference.
  var mySecondsDifference = myExpectedSeconds - myActualSeconds;
 
  Util_Assertion.AssertValuesAreEqual(myExpectedDate, myActualDate, "Date: ", undefined);
  
  switch (myHourDifference)
  {
    case 0:
      if (myMinutesDifference == 0)
      {
        if (Math.abs(mySecondsDifference) <= 3)
        {
          return myIsCompareDateTime = true;
        }
      }
      else if (myMinutesDifference == 1)
      {
        myExpectedSeconds += 60;
        mySecondsDifference = myExpectedSeconds - myActualSeconds;
        if (Math.abs(mySecondsDifference) <= 3)
        {
          return myIsCompareDateTime = true;
        }
      }
      else if (myMinutesDifference == -1)
      {
        myActualSeconds += 60;
        mySecondsDifference = myExpectedSeconds - myActualSeconds;
        if (Math.abs(mySecondsDifference) <= 3)
        {
          return myIsCompareDateTime = true;
        }
      }
    break;
    case 1:
      myExpectedMinutes += 60;
      myExpectedSeconds += 60;
      myMinutesDifference = myExpectedMinutes - myActualMinutes;
      mySecondsDifference = myExpectedSeconds - myActualSeconds;
      if (myMinutesDifference == 0)
      {
        if (Math.abs(mySecondsDifference) <= 3)
        {
          return myIsCompareDateTime = true;
        }
      }
      else if (myMinutesDifference == 1)
      {
        if (Math.abs(mySecondsDifference) <= 3)
        {
          return myIsCompareDateTime = true; 
        }
      }
      else if (myMinutesDifference == -1)
      {
        if (Math.abs(mySecondsDifference) <= 3)
        {
          return myIsCompareDateTime = true;
        }
      }
    break;
    case -1:
      myActualMinutes += 60;
      myActualSeconds += 60;
      myMinutesDifference = myExpectedMinutes - myActualMinutes;
      mySecondsDifference = myExpectedSeconds - myActualSeconds;
      if (myMinutesDifference == 0)
      {
        if (Math.abs(mySecondsDifference) <= 3)
        {
          return myIsCompareDateTime = true;
        }
      }
      else if (myMinutesDifference == 1)
      {
        if (Math.abs(mySecondsDifference) <= 3)
        {
          return myIsCompareDateTime = true;
        }
      }
      else if (myMinutesDifference == -1)
      {
        if (Math.abs(mySecondsDifference) <= 3)
        {
          return myIsCompareDateTime = true;
        }
      }
    break;
  }
  return myIsCompareDateTime;
}