Feature: US_217824 - Container reuse

    #FileName: S5_Consumable_US_217824 - Container reuse - Extract new reagent successfully
    #FeatureVersion: 0.4
    #ReviewedBy: AnhTH10
    
    #Consolidated test cases for better understanding and testing.
    @M232101 @M232108 @M232113 @M232117 @M232121 @M232126 @M232130 @M232136 @M232141 @M232143 @M232272 @M232274 @A249181 @9375_DID_1617 @US217824 @Consumable
    Scenario Outline: 249181_Extract new reagent successfully
        Given The valid barcode is available and it had not been setup before
        When A valid GET request with Valid barcode "<Valid barcode>" is sent to the Reagent Setup API to check isExisted of Reagent
        Then The Reagent Setup API will respond with status code "<Status>" and flag "<isExisted>"

        Examples:
            | Note                 | Valid barcode                        | Status | isExisted |
            | Diluent reagent - 1  | +H6286280171H2332206166543722F80017H | 200    | false     |
            | Diluent reagent - 2  | +H6286280171H2332206166543722F80018H | 200    | false     |
            | Diluent reagent - 3  | +H6286280171H2332206164847541F20019H | 200    | false     |
            | Sheath reagent - 1   | +H6286280811H2332206169765142K30020H | 200    | false     |
            | Sheath reagent - 2   | +H6286280811H2332206169765142K30021H | 200    | false     |
            | Sheath reagent - 3   | +H6286280811H2332206169765142K30022H | 200    | false     |
            | Cleaner reagent - 1  | +H6286280221H2332206162901649H10023H | 200    | false     |
            | Cleaner reagent - 2  | +H6286280221H2332206162901649H10024H | 200    | false     |
            | Stain reagent - 1    | +H6286280211H2332206179711197L60025H | 200    | false     |
            | Stain reagent - 2    | +H6286280211H2332206179711197L60026H | 200    | false     |
            | CBC Lyse reagent - 1 | +H6286280181H2332206173390479M20027H | 200    | false     |
            | CBC Lyse reagent - 2 | +H6286280181H2332206173390479M20028H | 200    | false     |

    #FileName: S5_Consumable_US_217824 - Container reuse - Save new reagent successfully
    #FeatureVersion: 0.4
    #ReviewedBy: AnhTH10
    
    #Consolidated test cases for better understanding and testing.
    @M232106 @M232111 @M232115 @M232120 @M232123 @M232128 @M232134 @M232138 @M232142 @M232144 @M232273 @M232275 @A249182 @9375_DID_1617 @US217824 @Consumable
    Scenario Outline: 249182_Save new reagent successfully
        Given The reagent is input and validated successfully that have not been setup before
        And The Valid barcode given "<Valid barcode>" is input and validated correctly
        And The Instrument Id given "<Instrument Id>" is input and validated correctly
        And The Container Id given "<Container Id>" is input and validated correctly
        And The Cycles Remaining given "<Cycles Remaining>" will have the correct data
        When A valid POST request of Container Reuse is sent to the Save Reagent API
        Then The system saves the reagent successfully and responds with status code "<Status>"

        Examples:
            | Note                 | Valid barcode                        | Instrument Id | Container Id | Cycles Remaining | Status |
            | Diluent reagent - 1  | +H6286280171H2332206166543722F80017H | 1             | 1            | 100              | 201    |
            | Diluent reagent - 2  | +H6286280171H2332206166543722F80018H | 1             | 2            | 100              | 201    |
            | Diluent reagent - 3  | +H6286280171H2332206164847541F20019H | 1             | 1            | 100              | 201    |
            | Sheath reagent - 1   | +H6286280811H2332206169765142K30020H | 1             | 4            | 100              | 201    |
            | Sheath reagent - 2   | +H6286280811H2332206169765142K30021H | 1             | 5            | 100              | 201    |
            | Sheath reagent - 3   | +H6286280811H2332206169765142K30022H | 1             | 4            | 100              | 201    |
            | Cleaner reagent - 1  | +H6286280221H2332206162901649H10023H | 1             | 3            | 100              | 201    |
            | Cleaner reagent - 2  | +H6286280221H2332206162901649H10024H | 1             | 3            | 100              | 201    |
            | Stain reagent - 1    | +H6286280211H2332206179711197L60025H | 1             | 6            | 100              | 201    |
            | Stain reagent - 2    | +H6286280211H2332206179711197L60026H | 1             | 6            | 100              | 201    |
            | CBC Lyse reagent - 1 | +H6286280181H2332206173390479M20027H | 1             | 7            | 100              | 201    |
            | CBC Lyse reagent - 2 | +H6286280181H2332206173390479M20028H | 1             | 7            | 100              | 201    |

    #FileName: S5_Consumable_US_217824 - Container reuse - Submit barcode with duplicate 4 required values
    #FeatureVersion: 0.4
    #ReviewedBy: AnhTH10
    
    #Consolidated test cases for better understanding and testing.
    @M232276 @M232277 @M232278 @M232279 @M232280 @M232281 @M232282 @M232283 @M232284 @M232286 @M232287 @M232289 @M232290 @M232291 @M232293 @A249183 @9375_DID_1617 @US217824 @Consumable
    Scenario Outline: 249183_Submit barcode with duplicate 4 required values
        Given The first reagent is setup successfully with "<First Barcode>", "<First InstrumentId>", "<First ContainerId>", "<First CyclesRemaining>"
        When A valid POST request sent to the Save Reagent API with Barcode "<Barcode>" is input and validated correctly
        And The Instrument Id of the Reagent Setup API "<Instrument Id>" is input and validated correctly
        And The Container Id of the Reagent Setup API "<Container Id>" is input and validated correctly
        And The Cycles Remaining of the Reagent Setup API "<Cycles Remaining>" will have the correct data
        Then The Reagent Setup API will respond with status "<Status>"

        Examples:
            | Note                               | First Barcode                        | First InstrumentId | First ContainerId | First CyclesRemaining | Barcode                              | Instrument Id | Container Id | Cycles Remaining | Status                      |
            | Invalid reagent manufacturers - 1  | +H6286280171H2332206166543722F80017H | 1                  | 1                 | 100                   | +H6276280171H2332206166543722F80017H | 1             | 1            | 100              | InvalidManufacturer         |
            | Invalid reagent manufacturers - 2  | +H6286280811H2332206169765142K30020H | 1                  | 4                 | 100                   | +H62@6280811H2332206169765142K30020H | 1             | 4            | 100              | InvalidBarcode              |
            | Invalid reagent manufacturers - 3  | +H6286280221H2332206162901649H10023H | 1                  | 3                 | 100                   | +K6286280221H2332206162901649H10023H | 1             | 3            | 100              | InvalidManufacturer         |
            | Invalid reagent manufacturers - 4  | +H6286280211H2332206179711197L60026H | 1                  | 6                 | 100                   | +06286280211H2332206179711197L60026H | 1             | 6            | 100              | InvalidManufacturer         |
            | Invalid reagent manufacturers - 5  | +H6286280181H2332206173390479M20027H | 1                  | 7                 | 100                   | +h6286280181H2332206173390479M20027H | 1             | 7            | 100              | InvalidManufacturer         |
            | Invalid Expiration Date Format - 1 | +H6286280171H2332206166543722F80017H | 1                  | 1                 | 100                   | +H6286280171H2312206166543722F80017H | 1             | 1            | 100              | InvalidExpirationDateFormat |
            | Invalid Expiration Date Format - 2 | +H6286280811H2332206169765142K30020H | 1                  | 4                 | 100                   | +H6286280811H2302206169765142K30020H | 1             | 4            | 100              | InvalidExpirationDateFormat |
            | Invalid Expiration Date Format - 3 | +H6286280221H2332206162901649H10023H | 1                  | 3                 | 100                   | +H6286280221H23A2206162901649H10023H | 1             | 3            | 100              | InvalidExpirationDateFormat |
            | Invalid Expiration Date Format - 4 | +H6286280211H2332206179711197L60026H | 1                  | 6                 | 100                   | +H6286280211H23.2206179711197L60026H | 1             | 6            | 100              | InvalidBarcode              |
            | Invalid Expiration Date Format - 5 | +H6286280181H2332206173390479M20027H | 1                  | 7                 | 100                   | +H6286280181H23-2206173390479M20027H | 1             | 7            | 100              | InvalidBarcode              |
            | Invalid Expiration Date - 1        | +H6286280171H2332206166543722F80017H | 1                  | 1                 | 100                   | +H6286280171H23322a6166543722F80017H | 1             | 1            | 100              | InvalidExpirationDate       |
            | Invalid Expiration Date - 2        | +H6286280811H2332206169765142K30020H | 1                  | 4                 | 100                   | +H6286280811H23322@@169765142K30020H | 1             | 4            | 100              | InvalidBarcode              |
            | Invalid Expiration Date - 3        | +H6286280221H2332206162901649H10023H | 1                  | 3                 | 100                   | +H6286280221H2322206162901649H10023H | 1             | 3            | 100              | InvalidExpirationDate       |
            | Invalid Expiration Date - 4        | +H6286280211H2332206179711197L60026H | 1                  | 6                 | 100                   | +H6286280211H2332200009711197L60026H | 1             | 6            | 100              | InvalidExpirationDate       |
            | Invalid Expiration Date - 5        | +H6286280181H2332206173390479M20027H | 1                  | 7                 | 100                   | +H6286280181H2332200173390479M20027H | 1             | 7            | 100              | InvalidExpirationDate       |

    #FileName: S5_Consumable_US_217824 - Container reuse - Submit duplicate barcode
    #FeatureVersion: 0.4
    #ReviewedBy: AnhTH10
    
    #Consolidated test cases for better understanding and testing.
    @M232294 @M232295 @M232296 @M232297 @M232298 @A249184 @9375_DID_1617 @US217824 @Consumable
    Scenario Outline: 249184_Submit duplicate barcode
        Given The first reagent is setup successfully with "<First Barcode>", "<First InstrumentId>", "<First ContainerId>", "<First CyclesRemaining>"
        When A valid GET request with Valid barcode "<Valid barcode>" is sent to the Reagent Setup API
        Then The Reagent Setup API will respond with status code "<Status>" and flag "<isExisted>"

        Examples:
            | Note                            | First Barcode                        | First InstrumentId | First ContainerId | First CyclesRemaining | Valid barcode                        | Status | isExisted |
            | Various the Expiration Date - 1 | +H6286280171H2332206166543722F80017H | 1                  | 1                 | 100                   | +H6286280171H2332207076543722F80017H | 200    | true      |
            | Various the Expiration Date - 2 | +H6286280811H2332206169765142K30020H | 1                  | 4                 | 100                   | +H6286280811H2332306169765142K30020H | 200    | true      |
            | Various the Expiration Date - 3 | +H6286280221H2332206162901649H10023H | 1                  | 3                 | 100                   | +H6286280221H2320817222901649H10023H | 200    | true      |
            | Various the Expiration Date - 4 | +H6286280211H2332206179711197L60026H | 1                  | 6                 | 100                   | +H6286280211H2332207179711197L60026H | 200    | true      |
            | Various the Expiration Date - 5 | +H6286280181H2332206173390479M20027H | 1                  | 7                 | 100                   | +H6286280181H2332006173390479M20027H | 200    | true      |

    #FileName: S5_Consumable_US_217824 - Container reuse - Submit barcode already existed in the DB
    #FeatureVersion: 0.4
    #ReviewedBy: AnhTH10
    
    #Consolidated test cases for better understanding and testing.
    @M232299 @M232300 @M232301 @M232302 @M232303 @A249186 @9375_DID_1617 @US217824 @Consumable
    Scenario Outline: 249186_Submit barcode already existed in the DB
        Given The first reagent is setup successfully with "<First Barcode>", "<First InstrumentId>", "<First ContainerId>", "<First CyclesRemaining>"
        When A valid GET request with Valid barcode "<Valid barcode>" is sent to the Reagent Setup API
        Then The Reagent Setup API will respond with status code "<Status>" and flag "<isExisted>"

        Examples:
            | First Barcode                        | First InstrumentId | First ContainerId | First CyclesRemaining | Valid barcode                        | Status | isExisted |
            | +H6286280171H2332206166543722F80017H | 1                  | 1                 | 100                   | +H6286280171H2332206166543722F80017H | 200    | true      |
            | +H6286280811H2332206169765142K30020H | 1                  | 4                 | 100                   | +H6286280811H2332206169765142K30020H | 200    | true      |
            | +H6286280221H2332206162901649H10023H | 1                  | 3                 | 100                   | +H6286280221H2332206162901649H10023H | 200    | true      |
            | +H6286280211H2332206179711197L60025H | 1                  | 6                 | 100                   | +H6286280211H2332206179711197L60025H | 200    | true      |
            | +H6286280181H2332206173390479M20027H | 1                  | 7                 | 100                   | +H6286280181H2332206173390479M20027H | 200    | true      |

    #FileName: S5_Consumable_US_217824 - Container reuse - Save reagent unsuccessfully
    #FeatureVersion: 0.4
    #ReviewedBy: AnhTH10
    
    #Consolidated test cases for better understanding and testing.
    @M232305 @M232306 @M232307 @M232309 @M232310 @M232311 @M232312 @M232313 @M232314 @M232315 @M232316 @M232317 @M232318 @M232319 @M232320 @M232321 @M238082 @M238083 @M238087 @M238089
    @A249187 @9375_DID_1617 @US217824 @Consumable
    Scenario Outline: 249187_Save reagent unsuccessfully
        Given The first reagent is setup successfully with "<First Barcode>", "<First InstrumentId>", "<First ContainerId>", "<First CyclesRemaining>"
        When A valid POST request sent to the Save Reagent API with Barcode <Barcode> is input and validated correctly
        And The Instrument Id "<Instrument Id>" is input and validated correctly
        And The Container Id "<Container Id>" is input and validated correctly
        And The Cycles Remaining "<Cycles Remaining>" will have the correct data
        Then The system saves the reagent unsuccessfully and responds with status "<Status>"

        Examples:
            | Note                                                             | First Barcode                        | First InstrumentId | First ContainerId | First CyclesRemaining | Barcode                                | Instrument Id | Container Id | Cycles Remaining | Status                         |
            | Duplicate reagent - 1                                            | +H6286280171H2332206166543722F80017H | 1                  | 1                 | 100                   | "+H6286280171H2332206166543722F80017H" | 1             | 1            | 100              | ReagentAlreadyExists           |
            | Duplicate reagent - 2                                            | +H6286280171H2332206166543722F80017H | 1                  | 2                 | 100                   | "+H6286280171H2332206166543722F80017H" | 1             | 2            | 100              | ReagentAlreadyExists           |
            | Duplicate reagent - 3                                            | +H6286280811H2332206169765142K30020H | 1                  | 4                 | 100                   | "+H6286280811H2332206169765142K30020H" | 1             | 4            | 100              | ReagentAlreadyExists           |
            | Duplicate reagent - 4                                            | +H6286280811H2332206169765142K30020H | 1                  | 5                 | 100                   | "+H6286280811H2332206169765142K30020H" | 1             | 5            | 100              | ReagentAlreadyExists           |
            | Duplicate reagent - 5                                            | +H6286280181H2332206173390479M20027H | 1                  | 7                 | 100                   | "+H6286280181H2332206173390479M20027H" | 1             | 7            | 100              | ReagentAlreadyExists           |
            | Duplicate reagent - 6                                            | +H6286280211H2332206179711197L60025H | 1                  | 6                 | 100                   | "+H6286280211H2332206179711197L60025H" | 1             | 6            | 100              | ReagentAlreadyExists           |
            | Duplicate reagent - 7                                            | +H6286280221H2332206162901649H10023H | 1                  | 3                 | 100                   | "+H6286280221H2332206162901649H10023H" | 1             | 3            | 100              | ReagentAlreadyExists           |
            | Duplicate reagent and Invalid Expiration Date Format             | +H6286280171H2332206166543722F80017H | 1                  | 1                 | 100                   | "+H6286280171H2312206166543722F88134H" | 1             | 1            | 100              | InvalidExpirationDateFormat    |
            | Duplicate reagent and Invalid Date                               | +H6286280171H2332206166543722F80017H | 1                  | 1                 | 100                   | "+H6286280171H2334016166543722F88134H" | 1             | 1            | 100              | InvalidExpirationDate          |
            | Duplicate reagent and Mixing lowercase letters                   | +H6286280221H2332206162901649H10023H | 1                  | 3                 | 100                   | "+h6286280221H2332206162901649H10023H" | 1             | 3            | 100              | InvalidManufacturer            |
            | Duplicate reagent and Invalid Product Number                     | +H6286280211H2332206179711197L60026H | 1                  | 6                 | 100                   | "+H6286280201H2332206179711197L68668H" | 1             | 6            | 100              | InvalidReagentProductNumber    |
            | Duplicate reagent and Invalid value lot number                   | +H6286280181H2332206173390479M20027H | 1                  | 7                 | 100                   | "+H6286280181H233220617330479M21658H"  | 1             | 7            | 100              | InvalidBarcodeLength           |
            | Duplicate reagent and Invalid value                              | +H6286280181H2332206173390479M20027H | 1                  | 7                 | 100                   | "+H6286280181H2332206173390479M20027H" | 1             | 7            | 0                | InvalidCyclesRemaining         |
            | Duplicate reagent and Invalid value Instrument Id                | +H6286280181H2332206173390479M20027H | 1                  | 7                 | 100                   | "+H6286280181H2332206173390479M20027H" | 0             | 7            | 100              | InvalidInstrumentId            |
            | Duplicate reagent and Invalid value container id                 | +H6286280211H2332206179711197L60026H | 1                  | 6                 | 100                   | "+H6286280211H2332206179711197L60026H" | 1             | 9            | 100              | InvalidContainerId             |
            | Duplicate reagent and Invalid Reagent Type Id                    | +H6286280221H2332206162901649H10024H | 1                  | 3                 | 100                   | "+H6286280221H2332206162901649h10024H" | 1             | 3            | 100              | InvalidReagentTypeId           |
            | Duplicate reagent and Reagent type is not mapping with container | +H6286280211H2332206179711197L60026H | 1                  | 6                 | 100                   | "+H6286280211H2332206179711197L60026H" | 1             | 7            | 100              | NotMapReagentTypeWithContainer |
            | Duplicate reagent and Barcode contains space                     | +H6286280211H2332206179711197L60026H | 1                  | 6                 | 100                   | " H6286280211H2332206179711197L60026H" | 1             | 3            | 100              | BarcodeContainsSpace           |
            | Duplicate reagent and Invalid start character                    | +H6286280211H2332206179711197L60026H | 1                  | 6                 | 100                   | "@H6286280211H2332206179711197L60026H" | 1             | 3            | 100              | InvalidBarcode                 |
            | Duplicate reagent and Invalid Lot number                         | +H6286280211H2332206179711197L60026H | 1                  | 6                 | 100                   | "+H6286280211H233220617971119aL60026H" | 1             | 3            | 100              | InvalidReagentLotNumber        |