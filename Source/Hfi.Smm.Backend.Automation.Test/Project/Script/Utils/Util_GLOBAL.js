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
/// IP of Postgre server.
/// </summary>
var PostgreSqlServerAddress = "10.244.172.6";

/// <summary>
/// Port connection of Postgre server.
/// </summary>
var PostgreSqlServerPort = "5432";

/// <param name="BaseUrl">[string]The Base URL of the API that is accessing</param> 
var BaseUrl = "http://10.244.172.6";

/// <param name="PortBaseUrl">[string]The port of Base URL of the API that is accessing</param>
var PortBaseUrl = ":80";

/// <param name="PortRabbitMQ">[string]The port of Base URL of the API that is accessing</param>
var PortRabbitMQ = ":15672";

/// <param name="SubBaseURLConsumable">[string]The Sub Base URL of the API for different sevice that is accessing</param> 
var SubBaseURLConsumable = "/consumable-service/v1";

/// <param name="SubBaseURLMonitoring">[string]The Sub Base URL of the API for different sevice that is accessing</param> 
var SubBaseURLMonitoring = "/monitoring-service/v1";