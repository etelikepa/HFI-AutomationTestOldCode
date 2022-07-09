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

var  postgreSqlConnection;

/// <summary>
/// Get data from table data in scenario
/// </summary>
/// <param name=theRawData>The table data from scenario.</param>
function GetTableDataByRow(theRawData) 
{
  var myTable = [];
  for (var i = 1; i < theRawData.RowCount; i++) {
    var myRow = {};
    for (var j = 0; j < theRawData.ColumnCount; j++) {
      myRow[theRawData.Value(0, j)] = theRawData.Value(i, j);
    }
    myTable.push(myRow);
  }
  return myTable;
}

/// <summary>
/// Load data from datatable.
/// </summary>
/// <param name="theRawData">[table] The raw datatable.</param>
function GetTableDataByColumn(theRawData)
{
  var myTable = [];
  for (var i = 1; i < theRawData.ColumnCount; i++) {
    var myColumn = {};
    for (var j = 0; j < theRawData.RowCount; j++) {
      myColumn[theRawData.Value(j, 0)] = theRawData.Value(j, i);
    }
    myTable.push(myColumn);
  }
  return myTable;
}

/// <summary>
/// Connect to PostgreSQL.
/// </summary>
/// <param name="theDatabaseName">[string] The The name of data table accessed .</param>
/// <param name="thePassword">[string] The Password connected to Postgres which contains data.</param>
function ConnectDatabase (theDatabaseName, theUsername, thePassword)
{
  try
  {
    var postgreSqlConnection = ADO.CreateADOConnection();
    ConnectionString = "Driver=PostgreSQL ANSI;Data Source= PostgreSQL30;"
    + "Server=" + Util_GLOBAL.PostgreSqlServerAddress + ";"
    + "Port=" + Util_GLOBAL.PostgreSqlServerPort + ";"
    + "Database=" + theDatabaseName + ";"
    + "UserName=" + theUsername + ";"
    + "Password=" + thePassword + ";";
    postgreSqlConnection.ConnectionString = ConnectionString;
    postgreSqlConnection.LoginPrompt = false;
    postgreSqlConnection.Open();
    return postgreSqlConnection;
  }
  catch (e)
  {
    Log.Message(e);
  }
}

/// <summary>
/// Kill all other active connections to database.
/// </summary>
/// <param name="theConnectionName">[string] The opened connection to specified database.</param>
function DisconnectDatabase(theConnectionName)
{
  theConnectionName.Close();
}

/// <summary>
/// Execute query to select data from database.
/// </summary>
/// <param name="theConnectionName">[string] The opened connection to specified database.</param>
/// <param name="theStatement">[string] The query sentence.</param>
/// <param nawm="theFieldName">[object] The list names of selected fields (which is called in select query sentence). </param>
function QueryToSelect(theConnectionName, theStatement, theFieldName)
{
  var myReturnedData = [];
  var myQuery = theConnectionName.Execute_(theStatement);
  myQuery.MoveFirst();
  while (!myQuery.EOF) 
  {
    var myRecord = {};
    for (let i = 0; i < theFieldName.length; i++) 
    {
      var myFieldName = theFieldName[i];
      myRecord[theFieldName[i]] = myQuery.Fields.Item(theFieldName[i]).Value;
      Log.Message(myRecord[theFieldName[i]]);
    }
    myReturnedData.push(myRecord);
    myRecord = {};
    myQuery.MoveNext();
  }
  return myReturnedData;
}

/// <summary>
/// Excute query to select specified data from database.
/// </summary>
/// <param name="theConnectionName">[string] The opened connection to specified database.</param>
/// <param name="theStatement">[string] The query sentence.</param>
/// <param nawm="theFieldName">[string] The names of selected fields (which is called in select query sentence). </param>
function QueryToSelectSpecifiedItem(theConnectionName, theStatement, theFieldName)
{
  var myQuery = theConnectionName.Execute_(theStatement);
  var myRecord = myQuery.Fields.Item(theFieldName).Value
  return myRecord;
}

/// <summary>
/// Execute query to edit data from database.
/// </summary>
/// <param name="theConnectionName">[string] The opened connection to specified database.</param>
/// <param name="theStatement">[string] The query sentence.</param>
function QueryToEdit(theConnectionName, theStatement)
{
  theConnectionName.Execute(theStatement, undefined);
}

/// <summary>
/// Function PublishMsg to RabbitMQ.
/// </summary>
/// <param name="theNameExchanges">[string]The Name Exchanges per each MicroSercices.</param>
/// <param name="theContentPayLoad">[Json format]The content publish to RabbitMQ.</param>
/// <param name="theEndPoint">[string]The Endpoint of UI RabbitMQ that accessing.</param>
/// <param name="theHeader">[string]A string containing the actual name of the HTTP header you want to add. Must not contain colons (current the header is used: "Authorization").</param>
/// <param name="theHeaderValue">[string]The header value (current the value header is used: "Basic Z3Vlc3Q6Z3Vlc3Q=").</param>
function SendRabbitMQMessage(theNameExchanges, theContentPayLoad, theEndPoint, theHeader, theHeaderValue) 
{
  var myJsonBody =
  {
    "vhost": "/",
    "name": theNameExchanges,
    "properties":
    {
      "delivery_mode": 2,
      "headers": {}
    },
    "routing_key": "",
    "delivery_mode": "2",
    "payload": theContentPayLoad,
    "headers": {},
    "props": {},
    "payload_encoding": "string"
  };
  var myRequest;
  myRequest = aqHttp.CreatePostRequest(Util_GLOBAL.BaseUrl + Util_GLOBAL.PortRabbitMQ + theEndPoint);
  myRequest.SetHeader("Content-Type", "application/json");
  myRequest.SetHeader(theHeader, theHeaderValue);
  myResponse = myRequest.Send(JSON.stringify(myJsonBody));
  return myResponse;
}