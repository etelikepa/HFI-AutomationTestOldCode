Feature: US_230229 - Extract barcode components

    #FileName: S5_Barcode_US_230229 - Extract barcode components - Submit valid reagent barcode
    #FeatureVersion: 0.3
    #ReviewedBy: TrucTMT1

    #Consolidated test cases for better understanding and testing.
    @M231682 @M231683 @M231684 @M231685 @M231686 @M231687 @M231688 @M231689 @M231690 @M231691 @M231692 @M231693 @M231694 @M231695 @M231696 @A249175 @9375_DID_1528 @US230229 @Consumable
    Scenario Outline: 249175_Submit valid reagent barcode
        Given valid barcode
        When A valid GET extract barcode request with "<Valid barcode>" is sent to the Reagent Setup API
        Then The Reagent Setup extract barcode API will respond with status "<Status>"
        And The "reagentType": "<Reagent Type>" will have the correct data
        And The "reagentPartNumber": "<Reagent Part Number>" will have the correct data
        And The "reagentLotNumber": "<Reagent Lot Number>" will have the correct data
        And The "reagentShelfLifeExpirationDate": "<Reagent Shelf Life Exp Date>" will have the correct data
        And The "reagentManufacturer": "<Reagent Manufacturer>" will have the correct data
        And The "reagentProductName": "<Reagent Product Name>" will have the correct data
        And The "bottleSequenceNumber": "<Bottle Sequence Number>" will have the correct data
        And The "cyclesRemaining": "<Cycles Remaining>" will have the correct data
        And The system generates the current system date as the Date Opened
        And The system calculates the Open Expiration Date is the Date Opened + 60 days
        And The system calculates the Use Before Date based on the earliest of the Open Exp Date and Shelf Life Exp Date

        Examples:
            | Note                                                                                                    | Valid barcode                        | Status | Reagent Type | Reagent Part Number | Reagent Lot Number | Reagent Shelf Life Exp Date | Reagent Manufacturer | Reagent Product Name | Bottle Sequence Number | Cycles Remaining | isExpired |
            | Extract barcode information                                                                             | +H6286280171H2332206123580192F61291H | 200    | Diluent      | 628017              | 3580192            | 2022-06-12T23:59:59Z        | Beckman Coulter Inc  | DxH Diluent          | 1291                   | 100              | false     |
            | Extract barcode information                                                                             | +H6286280811H2332206179405680K52883H | 200    | Sheath       | 628081              | 9405680            | 2022-06-17T23:59:59Z        | Beckman Coulter Inc  | DxH Pak              | 2883                   | 100              | false     |
            | Extract barcode information                                                                             | +H6286280211H2332206124218490L59799H | 200    | Stain        | 628021              | 4218490            | 2022-06-12T23:59:59Z        | Beckman Coulter Inc  | DxH Retic Pak        | 9799                   | 100              | false     |
            | Extract barcode information                                                                             | +H6286280221H2332206123918081H27941H | 200    | Cleaner      | 628022              | 3918081            | 2022-06-12T23:59:59Z        | Beckman Coulter Inc  | DxH Cleaner          | 7941                   | 100              | false     |
            | Extract barcode information                                                                             | +H6286280181H2332206151367007M35164H | 200    | CBC Lyse     | 628018              | 1367007            | 2022-06-15T23:59:59Z        | Beckman Coulter Inc  | DxH Cell Lyse        | 5164                   | 100              | false     |
            | The system calculates the Open Expiration Date for Diluent reagent. Opened Date is 2022-04-25T00:23:23  | +H6286280171T2332206203239834F18284T | 200    | Diluent      | 628017              | 3239834            | 2022-06-20T23:59:59Z        | Beckman Coulter Inc  | DxH Diluent          | 8284                   | 100              | false     |
            | The system calculates the Open Expiration Date for Diluent reagent. Opened Date is 2022-04-28T00:23:23  | +H6286280171H2332206203239834F18284H | 200    | Diluent      | 628017              | 3239834            | 2022-06-20T23:59:59Z        | Beckman Coulter Inc  | DxH Diluent          | 8284                   | 100              | false     |
            | The system calculates the Open Expiration Date for Sheath reagent. Opened Date is 2022-04-27T08:23:23   | +H6286280811D2332206057846313K21152D | 200    | Sheath       | 628081              | 7846313            | 2022-06-05T23:59:59Z        | Beckman Coulter Inc  | DxH Pak              | 1152                   | 100              | false     |
            | The system calculates the Open Expiration Date for Sheath reagent. Opened Date is 2022-04-29T08:23:23   | +H6286280811T2332206121122540K70752T | 200    | Sheath       | 628081              | 1122540            | 2022-06-12T23:59:59Z        | Beckman Coulter Inc  | DxH Pak              | 0752                   | 100              | false     |
            | The system calculates the Open Expiration Date for Stain reagent. Opened Date is 2022-04-27T08:23:23    | +H6286280211H2320523221053927L62914H | 200    | Stain        | 628021              | 1053927            | 2022-05-23T23:59:59Z        | Beckman Coulter Inc  | DxH Retic Pak        | 2914                   | 100              | false     |
            | The system calculates the Open Expiration Date for Stain reagent. Opened Date is 2022-04-20T00:23:23    | +H6286280211H2320525226236942L01819H | 200    | Stain        | 628021              | 6236942            | 2022-05-25T23:59:59Z        | Beckman Coulter Inc  | DxH Retic Pak        | 1819                   | 100              | false     |
            | The system calculates the Open Expiration Date for Cleaner reagent. Opened Date is 2022-04-20T00:23:23  | +H6286280221H2320524225758963H46783H | 200    | Cleaner      | 628022              | 5758963            | 2022-05-24T23:59:59Z        | Beckman Coulter Inc  | DxH Cleaner          | 6783                   | 100              | false     |
            | The system calculates the Open Expiration Date for Cleaner reagent. Opened Date is 2022-04-20T08:23:23  | +H6286280221H2320526224724842H12013H | 200    | Cleaner      | 628022              | 4724842            | 2022-05-26T23:59:59Z        | Beckman Coulter Inc  | DxH Cleaner          | 2013                   | 100              | false     |
            | The system calculates the Open Expiration Date for CBC Lyse reagent. Opened Date is 2022-04-20T08:23:23 | +H6286280181H2320526227112359M21376H | 200    | CBC Lyse     | 628018              | 7112359            | 2022-05-26T23:59:59Z        | Beckman Coulter Inc  | DxH Cell Lyse        | 1376                   | 100              | false     |
            | The system calculates the Open Expiration Date for CBC Lyse reagent. Opened Date is 2022-04-21T00:23:23 | +H6286280181H2320524225837910M49194H | 200    | CBC Lyse     | 628018              | 5837910            | 2022-05-24T23:59:59Z        | Beckman Coulter Inc  | DxH Cell Lyse        | 9194                   | 100              | false     |

    #FileName: S5_Barcode_US_230229 - Extract barcode components - Submit valid barcode with the Date Opened is earlier than Use Before Date and Use Before Date is earlier than Shelf Life Exp
    #FeatureVersion: 0.3
    #ReviewedBy: TrucTMT1
    
    @M231697 @A249176 @9375_DID_1528 @US230229 @Consumable
    Scenario Outline: 249176_Submit valid barcode with the Date Opened is earlier than Use Before Date and Use Before Date is earlier than Shelf Life Exp
        Given valid barcode
        When A valid GET request with "<Valid barcode>" have Use Before Date is earlier than Shelf Life Exp is sent to the Reagent Setup API
        Then The Reagent Setup extract barcode API will respond with status "<Status>"
        And The "reagentLotNumber": "<Reagent Lot Number>" will have the correct data
        And The "reagentManufacturer": "<Reagent Manufacturer>" will have the correct data
        And The "reagentPartNumber": "<Reagent Part Number>" will have the correct data
        And The "reagentProductName": "<Reagent Product Name>" will have the correct data
        And The "reagentType": "<Reagent Type>" will have the correct data
        And The "bottleSequenceNumber": "<Bottle Sequence Number>" will have the correct data
        And The "cyclesRemaining": "<Cycles Remaining>" will have the correct data
        And The system generates the current system date as the Date Opened
        And The system calculates the Open Expiration Date is the Date Opened + 60 days
        And The system calculates the Use Before Date based on the earliest of the Open Exp Date and Shelf Life Exp Date

        Examples:
            | Note                               | Valid barcode                        | Status | Reagent Type | Reagent Part Number | Reagent Lot Number | Reagent Shelf Life Exp Date | Reagent Manufacturer | Reagent Product Name | Bottle Sequence Number | Cycles Remaining | isExpired |
            | Opened Date is 2022-04-25T00:23:23 | +H6286280171H2320713228684913F39671H | 200    | Diluent      | 628017              | 8684913            | 2022-07-13T23:59:59Z        | Beckman Coulter Inc  | DxH Diluent          | 9671                   | 100              | false     |

    #FileName: S5_Barcode_US_230229 - Extract barcode components - Submit valid barcode with the Date Opened is earlier than Shelf Life Exp and Shelf Life Exp is earlier than Use Before Date
    #FeatureVersion: 0.3
    #ReviewedBy: TrucTMT1
    
    @M231698 @A249177 @9375_DID_1528 @US230229 @Consumable
    Scenario Outline: 249177_Submit valid barcode with the Date Opened is earlier than Shelf Life Exp and Shelf Life Exp is earlier than Use Before Date
        Given valid barcode
        When A valid GET request with "<Valid barcode>" have Shelf Life Exp is earlier than Use Before Date is sent to the Reagent Setup API
        Then The Reagent Setup extract barcode API will respond with status "<Status>"
        And The "reagentLotNumber": "<Reagent Lot Number>" will have the correct data
        And The "reagentManufacturer": "<Reagent Manufacturer>" will have the correct data
        And The "reagentPartNumber": "<Reagent Part Number>" will have the correct data
        And The "reagentProductName": "<Reagent Product Name>" will have the correct data
        And The "reagentType": "<Reagent Type>" will have the correct data
        And The "bottleSequenceNumber": "<Bottle Sequence Number>" will have the correct data
        And The "cyclesRemaining": "<Cycles Remaining>" will have the correct data
        And The system generates the current system date as the Date Opened
        And The system calculates the Open Expiration Date is the Date Opened + 60 days
        And The system calculates the Use Before Date based on the earliest of the Open Exp Date and Shelf Life Exp Date

        Examples:
            | Note                               | Valid barcode                        | Status | Reagent Type | Reagent Part Number | Reagent Lot Number | Reagent Shelf Life Exp Date | Reagent Manufacturer | Reagent Product Name | Bottle Sequence Number | Cycles Remaining | isExpired |
            | Opened Date is 2022-04-25T00:23:23 | +H6286280211H2320519223839141L81130H | 200    | Stain        | 628021              | 3839141            | 2022-05-19T23:59:59Z        | Beckman Coulter Inc  | DxH Retic Pak        | 1130                   | 100              | false     |

    #FileName: S5_Barcode_US_230229 - Extract barcode components - Submit valid barcode with the Date Opened is earlier than (Use Before Date = Shelf Life Exp)
    #FeatureVersion: 0.3
    #ReviewedBy: TrucTMT1
    
    @M231699 @A249178 @9375_DID_1528 @US230229 @Consumable
    Scenario Outline: 249178_Submit valid barcode with the Date Opened is earlier than (Use Before Date = Shelf Life Exp)
        Given valid barcode
        When A valid GET request with "<Valid barcode>" have Use Before Date = Shelf Life Exp is sent to the Reagent Setup API
        Then The Reagent Setup extract barcode API will respond with status "<Status>"
        And The "reagentLotNumber": "<Reagent Lot Number>" will have the correct data
        And The "reagentManufacturer": "<Reagent Manufacturer>" will have the correct data
        And The "reagentPartNumber": "<Reagent Part Number>" will have the correct data
        And The "reagentProductName": "<Reagent Product Name>" will have the correct data
        And The "reagentType": "<Reagent Type>" will have the correct data
        And The "bottleSequenceNumber": "<Bottle Sequence Number>" will have the correct data
        And The "cyclesRemaining": "<Cycles Remaining>" will have the correct data
        And The system generates the current system date as the Date Opened
        And The system calculates the Open Expiration Date is the Date Opened + 60 days
        And The system calculates the Use Before Date based on the earliest of the Open Exp Date and Shelf Life Exp Date

        Examples:
            | Note                               | Valid barcode                        | Status | Reagent Type | Reagent Part Number | Reagent Lot Number | Reagent Shelf Life Exp Date | Reagent Manufacturer | Reagent Product Name | Bottle Sequence Number | Cycles Remaining | isExpired |
            | Opened Date is 2022-04-28T00:23:23 | +H6286280811H2320627229818714K81424H | 200    | Sheath       | 628081              | 9818714            | 2022-06-27T23:59:59Z        | Beckman Coulter Inc  | DxH Pak              | 1424                   | 100              | false     |