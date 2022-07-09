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

/// <summary>
/// Returns a safe collection.
/// </summary>
/// <param name=theCollectionOrObject>The given object or collection.</param>
/// <param name=thePropertyName>The property name if an object was given.</param>
/// <returns>An empty collection if the input collection is undefined, the
/// same collection otherwise.</returns>
function SafeCollection (theCollectionOrObject, thePropertyName)
{
  var collection = undefined;

  // If the input collection or object is undefined an empty collection
  // is returned.
  if ( theCollectionOrObject == undefined )
  {
    collection = [];
  }
  else
  {
    // If the property name is defined then it is assumed that the input
    // is an object.</remarks>
    if ( thePropertyName != undefined )
    {
      var object = theCollectionOrObject;
      collection = SafeCollection(object[thePropertyName]);
    }
    // If the property name is undefined then it is assumed that the input
    // is a collection.
    else
    {
      var collection = theCollectionOrObject;
    }
  }
  return collection;
}

/// <summary>
/// Gets the numeric value from a given string.
/// </summary>
/// <param name="theString">The given string.</param>
/// <returns>The numeric value if the string represents a number,
/// undefined otherwise.</returns>
function GetNumericValue (theString)
{
  var numericValue = undefined;

  // The value is non-numeric if it fails to convert to float.
  try
  {
    numericValue = aqConvert.StrToFloat(theString);
  }
  catch ( e )
  {
    numericValue = undefined;
  }

  return numericValue;
}

/// <summary>
/// Returns a safe argument.
/// </summary>
/// <param name=theArgument>The given argument to be checked.</param>
/// <param name=theDefault>The value to be returned if the argument is undefined.</param>
/// <returns>A valid value of the argument.</returns>
function SafeArgument (theArgument, theDefault)
{
  // Return the Default object if the Argument object is undefined.
  if ( theArgument == undefined )
  {
    return theDefault;
  }
  else
  {
    return theArgument;
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