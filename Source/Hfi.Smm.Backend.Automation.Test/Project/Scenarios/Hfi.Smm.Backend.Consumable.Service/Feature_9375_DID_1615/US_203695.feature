Feature: US_203695 - Expired Reagents

    #FileName: S5_Barcode_US_203695 - Expired Reagents - Extract reagent - isExpired flag is true
    #FeatureVersion: 0.3
    #ReviewedBy: TrucTMT1
    
    #Consolidated test cases for better understanding and testing.
    @M231887 @M231890 @M231894 @M231897 @M231899 @M231902 @M231903 @M231906 @M231907 @M231908 @A249179 @9375_DID_1615 @US203695 @Consumable
    Scenario Outline: 249179_Extract reagent isExpired flag is true
        Given valid barcode
        When A valid GET request with "<Valid barcode>" is sent to the Reagent API
        Then The Reagent API will respond with Status Code "<Status>"
        And The "reagentLotNumber": "<Reagent Lot Number>" will have the correct value
        And The "reagentManufacturer": "<Reagent Manufacturer>" will have the correct value
        And The "reagentPartNumber": "<Reagent Part Number>" will have the correct value
        And The "reagentProductName": "<Reagent Product Name>" will have the correct value
        And The "reagentType": "<Reagent Type>" will have the correct value
        And The "reagentShelfLifeExpirationDate": "<Reagent Shelf Life Exp Date>" will have the correct value
        And The "bottleSequenceNumber": "<Bottle Sequence Number>" will have the correct value
        And The "cyclesRemaining": "<Cycles Remaining>" will have the correct value
        And The isExpired flag will have the correct value

        Examples:
            | Note                                                     | Valid barcode                        | Status | Reagent Type | Reagent Lot Number | Reagent Shelf Life Exp Date | Reagent Manufacturer | Reagent Product Name | Reagent Part Number | Cycles Remaining | Bottle Sequence Number | isExpired |
            | Reagent: Diluent and Date opened is 2022-05-05T03:49:01  | +H6286280170H1832204243807932F40332H | 200    | Diluent      | 3807932            | 2022-04-24T23:59:59Z        | Beckman Coulter Inc  | DxH Diluent          | 628017              | 100              | 0332                   | true      |
            | Reagent: Diluent and Date opened is 2022-05-05T03:53:12  | +H6286280170H1832204243807932F40332H | 200    | Diluent      | 3807932            | 2022-04-24T23:59:59Z        | Beckman Coulter Inc  | DxH Diluent          | 628017              | 100              | 0332                   | true      |
            | Reagent: Stain and Date opened is 2022-05-05T03:54:12    | +H6286280211M1832204245912357L22904M | 200    | Stain        | 5912357            | 2022-04-24T23:59:59Z        | Beckman Coulter Inc  | DxH Retic Pak        | 628021              | 100              | 2904                   | true      |
            | Reagent: Stain and Date opened is 2022-05-05T03:56:26    | +H6286280211M1832204245912357L22904M | 200    | Stain        | 5912357            | 2022-04-24T23:59:59Z        | Beckman Coulter Inc  | DxH Retic Pak        | 628021              | 100              | 2904                   | true      |
            | Reagent: Sheath and Date opened is 2022-05-05T04:01:28   | +H6286280810S1832204245625808K43534S | 200    | Sheath       | 5625808            | 2022-04-24T23:59:59Z        | Beckman Coulter Inc  | DxH Pak              | 628081              | 100              | 3534                   | true      |
            | Reagent: Sheath and Date opened is 2022-05-05T04:07:52   | +H6286280810S1832204255625808K43534S | 200    | Sheath       | 5625808            | 2022-04-25T23:59:59Z        | Beckman Coulter Inc  | DxH Pak              | 628081              | 100              | 3534                   | true      |
            | Reagent: Cleaner and Date opened is 2022-05-05T04:09:14  | +H6286280220F1832204253235661H93358F | 200    | Cleaner      | 3235661            | 2022-04-25T23:59:59Z        | Beckman Coulter Inc  | DxH Cleaner          | 628022              | 100              | 3358                   | true      |
            | Reagent: Cleaner and Date opened is 2022-05-05T04:11:27  | +H6286280220F1832204253235661H93358F | 200    | Cleaner      | 3235661            | 2022-04-25T23:59:59Z        | Beckman Coulter Inc  | DxH Cleaner          | 628022              | 100              | 3358                   | true      |
            | Reagent: CBC Lyse and Date opened is 2022-05-05T04:12:13 | +H6286280180H1832204247422246M48369H | 200    | CBC Lyse     | 7422246            | 2022-04-24T23:59:59Z        | Beckman Coulter Inc  | DxH Cell Lyse        | 628018              | 100              | 8369                   | true      |
            | Reagent: CBC Lyse and Date opened is 2022-05-05T04:13:52 | +H6286280180H1832204247422246M48369H | 200    | CBC Lyse     | 7422246            | 2022-04-24T23:59:59Z        | Beckman Coulter Inc  | DxH Cell Lyse        | 628018              | 100              | 8369                   | true      |

    #FileName: S5_Barcode_US_203695 - Expired Reagents - Extract reagent - isExpired flag is false
    #FeatureVersion: 0.3
    #ReviewedBy: TrucTMT1
    
    #Consolidated test cases for better understanding and testing.
    @M231909 @M231911 @M231912 @M231914 @M231916 @M231918 @M231921 @M231923 @M231926 @M231928 @A249180 @9375_DID_1615 @US203695 @Consumable
    Scenario Outline: 249180_Extract reagent isExpired flag is false
        Given valid barcode
        When A valid GET request with "<Valid barcode>" is sent to the Reagent API
        Then The Reagent API will respond with Status Code "<Status>"
        And The "reagentLotNumber": "<Reagent Lot Number>" will have the correct value
        And The "reagentManufacturer": "<Reagent Manufacturer>" will have the correct value
        And The "reagentPartNumber": "<Reagent Part Number>" will have the correct value
        And The "reagentProductName": "<Reagent Product Name>" will have the correct value
        And The "reagentType": "<Reagent Type>" will have the correct value
        And The "reagentShelfLifeExpirationDate": "<Reagent Shelf Life Exp Date>" will have the correct value
        And The "bottleSequenceNumber": "<Bottle Sequence Number>" will have the correct value
        And The "cyclesRemaining": "<Cycles Remaining>" will have the correct value
        And The isExpired flag will have the correct value

        Examples:
            | Note                                                     | Valid barcode                        | Status | Reagent Type | Reagent Lot Number | Reagent Shelf Life Exp Date | Reagent Manufacturer | Reagent Product Name | Reagent Part Number | Cycles Remaining | Bottle Sequence Number | isExpired |
            | Reagent: Diluent and Date opened is 2022-05-05T04:15:07  | +H6286280171D1832205308129909F87984D | 200    | Diluent      | 8129909            | 2022-05-30T23:59:59Z        | Beckman Coulter Inc  | DxH Diluent          | 628017              | 100              | 7984                   | false     |
            | Reagent: Diluent and Date opened is 2022-05-05T04:16:22  | +H6286280171H1832205308129909F87984H | 200    | Diluent      | 8129909            | 2022-05-30T23:59:59Z        | Beckman Coulter Inc  | DxH Diluent          | 628017              | 100              | 7984                   | false     |
            | Reagent: Stain and Date opened is 2022-05-05T04:17:48    | +H6286280210H1832205284869464L77137H | 200    | Stain        | 4869464            | 2022-05-28T23:59:59Z        | Beckman Coulter Inc  | DxH Retic Pak        | 628021              | 100              | 7137                   | false     |
            | Reagent: Stain and Date opened is 2022-05-05T04:18:57    | +H6286280210H1832205234869464L77137H | 200    | Stain        | 4869464            | 2022-05-23T23:59:59Z        | Beckman Coulter Inc  | DxH Retic Pak        | 628021              | 100              | 7137                   | false     |
            | Reagent: Sheath and Date opened is 2022-05-05T04:20:06   | +H6286280811H1832205296950343K46773H | 200    | Sheath       | 6950343            | 2022-05-29T23:59:59Z        | Beckman Coulter Inc  | DxH Pak              | 628081              | 100              | 6773                   | false     |
            | Reagent: Sheath and Date opened is 2022-05-05T04:22:07   | +H6286280811H1832205306950343K46773H | 200    | Sheath       | 6950343            | 2022-05-30T23:59:59Z        | Beckman Coulter Inc  | DxH Pak              | 628081              | 100              | 6773                   | false     |
            | Reagent: Cleaner and Date opened is 2022-05-05T04:23:12  | +H6286280220H1832205305519231H14168H | 200    | Cleaner      | 5519231            | 2022-05-30T23:59:59Z        | Beckman Coulter Inc  | DxH Cleaner          | 628022              | 100              | 4168                   | false     |
            | Reagent: Cleaner and Date opened is 2022-05-05T04:24:04  | +H6286280220N1832302195519231H14168N | 200    | Cleaner      | 5519231            | 2023-02-19T23:59:59Z        | Beckman Coulter Inc  | DxH Cleaner          | 628022              | 100              | 4168                   | false     |
            | Reagent: CBC Lyse and Date opened is 2022-05-05T04:26:04 | +H6286280181H1832205278632313M35027H | 200    | CBC Lyse     | 8632313            | 2022-05-27T23:59:59Z        | Beckman Coulter Inc  | DxH Cell Lyse        | 628018              | 100              | 5027                   | false     |
            | Reagent: CBC Lyse and Date opened is 2022-05-05T04:27:53 | +H6286280181Q1832205288632313M35027Q | 200    | CBC Lyse     | 8632313            | 2022-05-28T23:59:59Z        | Beckman Coulter Inc  | DxH Cell Lyse        | 628018              | 100              | 5027                   | false     |