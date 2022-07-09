﻿Feature: US_200496 - Save Reagent (initial setup + replacement)

    #FileName: S5_Consumable_US_200496 - Save Reagent (initial setup + replacement) - Save reagent successfully
    #FeatureVersion: 0.4
    #ReviewedBy: AnhTH10

    #Consolidated test cases for better understanding and testing.
    @M231711 @M231723 @M231726 @M231731 @M231733 @M231738 @M231741 @M231745 @M231749 @M231752 @M231759 @M231763 @A246718 @9375_DID_1528 @US200496 @Consumable
    Scenario Outline: 246718_Save reagent successfully
        Given The Barcode "<Barcode>" is input and validated correctly
        And The Instrument "<Instrument Id>" is input and validated correctly
        And The Container Id "<Container Id>" is input and validated correctly
        And The Cycles Remaining "<Cycles Remaining>" is input and validated correctly
        And The Container Configuration "<Container Configuration>" is input and validated correctly
        When A valid POST request is sent to the Save Reagent API
        Then The system saves the reagent successfully and responds with Status Code "<Status>"

        Examples:
            | Note                                                     | Barcode                              | Instrument Id | Container Id | Cycles Remaining | Container Configuration | Status |
            | Reagent: Stain                                           | +H6286280211H2320612228668351L40001H | 1             | 6            | 100              | Missing                 | 201    |
            | Reagent: CBC Lyse                                        | +H6286280181H2320612228371961M30002H | 1             | 7            | 100              | Missing                 | 201    |
            | Reagent: Cleaner                                         | +H6286280221H2320612225995595H50003H | 1             | 3            | 100              | Missing                 | 201    |
            | Reagent: Diluent and ContainerId: 1                      | +H6286280171H2320612227634809F70004H | 1             | 1            | 100              | Missing                 | 201    |
            | Reagent: Diluent and ContainerId: 2                      | +H6286280171H2320613225299519F00005H | 1             | 2            | 100              | Missing                 | 201    |
            | Reagent: Sheath and ContainerId: 4                       | +H6286280811H2320613223385085K90006H | 1             | 4            | 100              | Missing                 | 201    |
            | Reagent: Sheath and ContainerId: 5                       | +H6286280811H2320613226124072K00007H | 1             | 5            | 100              | Missing                 | 201    |
            | Input redundant valid Configuration of reagent: Cleaner  | +H6286280221H2320613227567933H80008H | 1             | 3            | 100              | Single                  | 201    |
            | Input redundant valid Configuration of reagent: Sheath   | +H6286280811H2320613226427755K70009H | 1             | 4            | 100              | Dual                    | 201    |
            | Input redundant valid Configuration of reagent: Stain    | +H6286280211H2320613225517192L50010H | 1             | 6            | 100              | Single                  | 201    |
            | Input redundant valid Configuration of reagent: CBC Lyse | +H6286280181H2320613223018904M30011H | 1             | 7            | 100              | Single                  | 201    |
            | Input redundant valid Configuration of reagent: Diluent  | +H6286280171H2320613223679285F70012H | 1             | 2            | 100              | Dual                    | 201    |

    #FileName: S5_Consumable_US_200496 - Save Reagent (initial setup + replacement) - Save reagent successfully - Input double valid values
    #FeatureVersion: 0.4
    #ReviewedBy: AnhTH10
    
    #Consolidated test cases for better understanding and testing.
    @M231770 @M231772 @A246719 @9375_DID_1528 @US200496 @Consumable
    Scenario Outline: 246719_Save reagent successfully Input double valid values
        Given The Barcode "<Barcode>" is input and validated correctly
        And The Instrument "<Instrument Id>" is input and validated correctly
        And The Container Id_One "<Container Id_1>" is input and validated correctly
        And The Container Id_Two "<Container Id_2>" is input and validated correctly
        And The Cycles Remaining_One "<Cycles Remaining_1>" is input and validated correctly
        And The Cycles Remaining_Two "<Cycles Remaining_2>" is input and validated correctly
        When A valid POST request with double valid values is sent to the Save Reagent API
        Then The system saves the reagent successfully and responds with Status Code "<Status>"

        Examples:
            | Note                                               | Barcode                              | Instrument Id | Container Id_1 | Container Id_2 | Cycles Remaining_1 | Cycles Remaining_2 | Status |
            | Input double valid values: Double Container Id     | +H6286280171H2320613223679285F70013H | 1             | 1              | 1              | 100                | Missing            | 201    |
            | Input double valid values: Double Cycles Remaining | +H6286280221H2320613227557486H30014H | 1             | 3              | Missing        | 3                  | 100                | 201    |

    #FileName: S5_Consumable_US_200496 - Save Reagent (initial setup + replacement) - Save reagent unsuccessfully
    #FeatureVersion: 0.4
    #ReviewedBy: AnhTH10
    
    #Consolidated test cases for better understanding and testing.
    @M231776 @M231779 @M231784 @M231788 @M231794 @M231798 @M231809 @M231813 @M231817 @M231822 @M231825 @M231828 @M231831 @M231834 @M231837 @M231839 @M231842 @M231845 @M231850 @M231853 @M231858
    @M231862 @M231865 @M231870 @M231876 @M231881 @M231884 @M231889 @M231892 @M231896 @M231900 @M231917 @M231920 @M231924 @M231929 @M231930 @M231931 @M231933 @M231934 @M231935 @M231937 @M231939
    @M231940 @M231941 @M231943 @M231945 @M231948 @M231950 @M231952 @M231953 @M231954 @M231956 @M231962 @M231965 @M231969 @M231973 @M231975 @M231979 @M231984 @M231995 @M232000 @M232001 @M232002
    @M232004 @M232005 @M232006 @M232008 @M232009 @M232000 @M232010 @M232012 @M232013 @M232014 @M232015 @M232016 @M232017 @M232018 @M232019 @M232022 @M232024 @M232029 @M232030 @M232031 @M232032
    @M232033 @M232034 @M232035 @M232036 @M232037 @M232039 @M232042 @M232044 @M232046 @M232049 @M232051 @M232053 @M232056 @M232058 @M232060 @M232063 @M232065 @M232067 @M232071 @M232074 @M232076
    @M232079 @M232081 @M232085 @M232087 @M232090 @M232092 @A249174 @9375_DID_1528 @US200496 @Consumable
    Scenario Outline: 249174_Save reagent unsuccessfully
        Given The Barcode "<Barcode>" is invalid barcode
        And The Instrument <Instrument Id> is input and validated correctly
        And The Container Id <Container Id> is input and validated correctly
        And The Cycles Remaining "<Cycles Remaining>" is input and validated correctly
        When A valid POST request with Barcode Invalid is sent to the Save Reagent API
        Then The system saves the reagent successfully and responds with Status Code "<Status Code>"
        And The system saves the reagent unsuccessfully and responds with Error Code "<Error Code>"

        Examples:
            | Note                                                                 | Barcode                                         | Instrument Id                            | Container Id                            | Cycles Remaining | Status Code | Error Code                          |
            | Barcode with invalid start character                                 | -H6286280221H2320613221849725H00610H            | "1"                                      | "3"                                     | 100              | 400         | InvalidBarcode                      |
            | Barcode with invalid start character                                 | aH6286280221H2320613221849725H00610H            | "1"                                      | "3"                                     | 100              | 400         | InvalidBarcode                      |
            | Barcode with invalid start character                                 | 1H6286280221H2320613221849725H00610H            | "1"                                      | "3"                                     | 100              | 400         | InvalidBarcode                      |
            | Barcode with invalid start character                                 | @H6286280221H2320613221849725H00610H            | "1"                                      | "3"                                     | 100              | 400         | InvalidBarcode                      |
            | Barcode with invalid start character                                 | +1H6286280221H2320613221849725H00610H           | "1"                                      | "3"                                     | 100              | 400         | InvalidBarcodeLength                |
            | Barcode with invalid start character                                 | H6286280221H2320613221849725H00610H             | "1"                                      | "3"                                     | 100              | 400         | InvalidBarcodeLength                |
            | Invalid Reagent Manufacturer: Mixing alpha numeric                   | +H6236280221H2320613221849725H00610H            | "1"                                      | "3"                                     | 100              | 400         | InvalidManufacturer                 |
            | Invalid Reagent Manufacturer: Mixing lowercase letters               | +h6286280221H2320613221849725H00610H            | "1"                                      | "3"                                     | 100              | 400         | InvalidManufacturer                 |
            | Invalid Reagent Manufacturer: Only numeric                           | +06286280221H2320613221849725H00610H            | "1"                                      | "3"                                     | 100              | 400         | InvalidManufacturer                 |
            | Invalid Reagent Manufacturer: Only alpha                             | +ABCD6280221H2320613221849725H00610H            | "1"                                      | "3"                                     | 100              | 400         | InvalidManufacturer                 |
            | Invalid Reagent Manufacturer: Blank                                  | +6280221H2320613221849725H00610H                | "1"                                      | "3"                                     | 100              | 400         | InvalidBarcodeLength                |
            | Invalid Reagent Manufacturer: Mixing special characters              | +@6286280221H2320613222271189H70458H            | "1"                                      | "3"                                     | 100              | 400         | InvalidBarcode                      |
            | Invalid Reagent Manufacturer: Mixing special characters              | +H62+6280221H2320613222271189H70458H            | "1"                                      | "3"                                     | 100              | 400         | InvalidBarcode                      |
            | Invalid Reagent Manufacturer: Only space characters                  | +    6280221H2320613222271189H70458H            | "1"                                      | "3"                                     | 100              | 400         | BarcodeContainsSpace                |
            | Invalid Reagent Manufacturer: Only special characters                | +@***6280221H2320613222271189H70458H            | "1"                                      | "3"                                     | 100              | 400         | InvalidBarcode                      |
            | Invalid Reagent Manufacturer: Reagent Manufacturer >255 characters   | Reagent Manufacturer more than 255 characters   | "1"                                      | "3"                                     | 100              | 400         | InvalidBarcodeLength                |
            | Invalid the Reagent Lot Number: Mixing alpha numeric                 | +H6286280221H23206132229193abH68215H            | "1"                                      | "3"                                     | 100              | 400         | InvalidReagentLotNumber             |
            | Invalid the Reagent Lot Number: Mixing special numeric               | +H6286280221H23206132229/9362H68215H            | "1"                                      | "3"                                     | 100              | 400         | InvalidBarcode                      |
            | Invalid the Reagent Lot Number: Only alpha                           | +H6286280221H232061322ABCDEFWH68215H            | "1"                                      | "3"                                     | 100              | 400         | InvalidReagentLotNumber             |
            | Invalid the Reagent Lot Number: Mixing space characters              | +H6286280221H23206132229  362H68215H            | "1"                                      | "3"                                     | 100              | 400         | BarcodeContainsSpace                |
            | Invalid the Reagent Lot Number: Invalid lenght                       | +H6286280221H2320613229362H68215H               | "1"                                      | "3"                                     | 100              | 400         | InvalidBarcodeLength                |
            | Invalid the Reagent Lot Number: Invalid lenght                       | +H6286280221H232061322212919362H68215H          | "1"                                      | "3"                                     | 100              | 400         | InvalidBarcodeLength                |
            | Invalid the Reagent Lot Number: Only space characters                | +H6286280811H232061322       K17123H            | "1"                                      | "3"                                     | 100              | 400         | BarcodeContainsSpace                |
            | Invalid the Reagent Lot Number: Reagent Lot Number is blank          | +H6286280811H232061322K17123H                   | "1"                                      | "4"                                     | 100              | 400         | InvalidBarcodeLength                |
            | Invalid the Reagent Lot Number: Reagent Lot Number >255              | Reagent Lot Number more than 255 characters     | "1"                                      | "4"                                     | 100              | 400         | InvalidBarcodeLength                |
            | Invalid the Reagent Product Number: Invalid value                    | +H6286280101H2320613222932443F80001H            | "1"                                      | "6"                                     | 100              | 400         | InvalidReagentProductNumber         |
            | Invalid the Reagent Product Number: Mixing alpha numeric             | +H6286280ab1H2320613222932443F80001H            | "1"                                      | "7"                                     | 100              | 400         | InvalidReagentProductNumber         |
            | Invalid the Reagent Product Number: Only alpha                       | +H628ABCDEF1H2320613223362581M83481H            | "1"                                      | "4"                                     | 100              | 400         | InvalidReagentProductNumber         |
            | Invalid the Reagent Product Number: Mixing special numeric           | +H628628/171H2332205202936798F70148H            | "1"                                      | "4"                                     | 100              | 400         | InvalidBarcode                      |
            | Invalid the Reagent Product Number: Only space characters            | +H628      1H2320613229328360L91318H            | "1"                                      | "6"                                     | 100              | 400         | BarcodeContainsSpace                |
            | Invalid the Reagent Product Number: Blank                            | +H6281H2320613229328360L91318H                  | "1"                                      | "7"                                     | 100              | 400         | InvalidBarcodeLength                |
            | Invalid the Reagent Product Number: Mixing space characters          | +H62862  211H2320613221267464L24827H            | "1"                                      | "1"                                     | 100              | 400         | BarcodeContainsSpace                |
            | Invalid the Reagent Product Number: No match with Reagent Type ID    | +H6286280171H2320613224127098M74250H            | "1"                                      | "1"                                     | 100              | 400         | ProductNumberAndReagentTypeMismatch |
            | Invalid Expiration Date: Invalid format                              | +H6286280171H2321306227063873F35117H            | "1"                                      | "5"                                     | 100              | 400         | InvalidExpirationDate               |
            | Invalid Expiration Date: Invalid format                              | +H6286280171H23206227063873F35117H              | "1"                                      | "5"                                     | 100              | 400         | InvalidBarcodeLength                |
            | Invalid Expiration Date: Invalid Date                                | +H6286280811H2322613808801872K00948H            | "1"                                      | "4"                                     | 100              | 400         | InvalidExpirationDate               |
            | Invalid Expiration Date: Mixing special characters                   | +H6286280221H23206:3228732284H87122H            | "1"                                      | "3"                                     | 100              | 400         | InvalidBarcode                      |
            | Invalid Expiration Date: Mixing space characters                     | +H6286280221H23206  228732284H87122H            | "1"                                      | "3"                                     | 100              | 400         | BarcodeContainsSpace                |
            | Invalid Expiration Date: Expiration Date is blank                    | +H6286280181H232      4255862M51415H            | "1"                                      | "7"                                     | 100              | 400         | BarcodeContainsSpace                |
            | Invaid Expiration Date Format: Mixing special characters             | +H6286280221H23!0613221356170H64078H            | "1"                                      | "3"                                     | 100              | 400         | InvalidBarcode                      |
            | Invaid Expiration Date Format: Mixing alpha numeric                  | +H6286280221H23a0613221356170H64078H            | "1"                                      | "3"                                     | 100              | 400         | InvalidExpirationDateFormat         |
            | Invaid Expiration Date Format: Invalid value                         | +H6286280221H2340613221356170H64078H            | "1"                                      | "3"                                     | 100              | 400         | InvalidExpirationDateFormat         |
            | Invaid Expiration Date Format: Invalid lenght                        | +H6286280221H23440613221356170H64078H           | "1"                                      | "3"                                     | 100              | 400         | InvalidBarcodeLength                |
            | Invaid Expiration Date Format: Expiration Date Format is blank       | +H6286280181H2332752698M68758H                  | "1"                                      | "7"                                     | 100              | 400         | InvalidBarcodeLength                |
            | Invalid the Cycles Remaining: Invalid value                          | +H6286280171H2332206141319406F78111H            | "1"                                      | "2"                                     | 10000            | 400         | InvalidCyclesRemaining              |
            | Invalid the Cycles Remaining: Invalid value                          | +H6286280221H2320614229333499H46605H            | "1"                                      | "3"                                     | 1                | 400         | InvalidCyclesRemaining              |
            | Invalid the Cycles Remaining: Invalid value                          | +H6286280811H2320614225892364K27199H            | "1"                                      | "5"                                     | 0                | 400         | InvalidCyclesRemaining              |
            | Invalid the Cycles Remaining: Invalid value                          | +H6286280181H2320614226206743M35347H            | "1"                                      | "7"                                     | 99               | 400         | InvalidCyclesRemaining              |
            | Invalid the Cycles Remaining: Invalid value                          | +H6286280181H2320614226206743M35347H            | "1"                                      | "7"                                     | 1000000          | 400         | InvalidCyclesRemaining              |
            | Invalid the Cycles Remaining: Invalid value                          | +H6286280181H2320614226206743M35347H            | "1"                                      | "7"                                     | -1               | 400         | InvalidCyclesRemaining              |
            | Invalid the Bottle Sequence Number: Invalid value                    | +H6286280171H2332206149472159F3756H             | "1"                                      | "2"                                     | 100              | 400         | InvalidBarcodeLength                |
            | Invalid the Bottle Sequence Number: Invalid value                    | +H6286280171H2332206149472159F3071256H          | "1"                                      | "2"                                     | 100              | 400         | InvalidBarcodeLength                |
            | Invalid the Bottle Sequence Number: Invalid value                    | +H6286280171H2332206144992582F90000H            | "1"                                      | "2"                                     | 100              | 400         | InvalidBottleSequenceNumber         |
            | Invalid the Bottle Sequence Number: Mixing alpha numeric             | +H6286280811H2332206148810044K65T15H            | "1"                                      | "4"                                     | 100              | 400         | InvalidBottleSequenceNumber         |
            | Invalid the Bottle Sequence Number: Mixing special characters        | +H6286280211H2332206147984500L63,46H            | "1"                                      | "6"                                     | 100              | 400         | InvalidBarcode                      |
            | Invalid the Bottle Sequence Number: Only alpha                       | +H6286280221H2332206142822208H4ABCDH            | "1"                                      | "3"                                     | 100              | 400         | InvalidBottleSequenceNumber         |
            | Invalid the Bottle Sequence Number: Mixing space characters          | +H6286280221H2332206146516382H31 50H            | "1"                                      | "3"                                     | 100              | 400         | BarcodeContainsSpace                |
            | Invalid the Bottle Sequence Number: Only space characters            | +H6286280811H2332206142560427K1    H            | "1"                                      | "4"                                     | 100              | 400         | BarcodeContainsSpace                |
            | Invalid the Bottle Sequence Number: The blank Bottle Sequence Number | +H6286280811H2320614225127425K3H                | "1"                                      | "5"                                     | 100              | 400         | InvalidBarcodeLength                |
            | Invalid the Bottle Sequence Number: Bottle Sequence Number > 255     | Bottle Sequence Number more than 255 characters | "1"                                      | "6"                                     | 100              | 400         | InvalidBarcodeLength                |
            | Invalid Reagent Type ID: Only numeric                                | +H6286280811H2320614228546768883436H            | "1"                                      | "4"                                     | 100              | 400         | InvalidReagentTypeId                |
            | Invalid Reagent Type ID: Mixing lowercase letters                    | +H6286280221H2320614225238012h48524H            | "1"                                      | "3"                                     | 100              | 400         | InvalidReagentTypeId                |
            | Invalid Reagent Type ID: Only space characters                       | +H6286280221H2320614225238012 48524H            | "1"                                      | "3"                                     | 100              | 400         | BarcodeContainsSpace                |
            | Invalid Reagent Type ID: Only special characters                     | +H6286280181H2320614225042378@69369H            | "1"                                      | "7"                                     | 100              | 400         | InvalidBarcode                      |
            | Invalid Reagent Type ID: The blank Reagent Type ID                   | +H6286280811H233220615792521125402H             | "1"                                      | "5"                                     | 100              | 400         | InvalidBarcodeLength                |
            | Invalid Reagent Type ID: Reagent Type ID > 255                       | Reagent Type ID more than 255 characters        | "1"                                      | "6"                                     | 100              | 400         | InvalidBarcodeLength                |
            | Invalid Instrument Id: Invalid value                                 | +H6286280171H2320614221925494F64658H            | "40e6215d-b5c6-4896-987c-f30f3678f6"     | "2"                                     | 100              | 400         | InvalidInstrumentId                 |
            | Invalid Instrument Id: Invalid value                                 | +H6286280171H2320614221925494F64658H            | "19"                                     | "2"                                     | 100              | 400         | InvalidInstrumentId                 |
            | Invalid Instrument Id: Invalid value                                 | +H6286280811H2320614226648835K10601H            | "0"                                      | "2"                                     | 100              | 400         | InvalidInstrumentId                 |
            | Invalid Instrument Id: Mixing alpha                                  | +H6286280811H2320614226648835K10601H            | "A"                                      | "1"                                     | 100              | 400         | InvalidInstrumentId                 |
            | Invalid Instrument Id: Mixing special characters                     | +H6286280181H2320614223112206M18604H            | "1@"                                     | "7"                                     | 100              | 400         | InvalidInstrumentId                 |
            | Invalid Instrument Id: Mixing space characters                       | +H6286280181H2320614223112206M18604H            | " 1"                                     | "7"                                     | 100              | 400         | InvalidInstrumentId                 |
            | Invalid Instrument Id: Only space characters                         | +H6286280181H2320614223112206M18604H            | "   "                                    | "1"                                     | 100              | 400         | InvalidInstrumentId                 |
            | Invalid Instrument Id: Only special characters                       | +H6286280181H2320614223112206M18604H            | "@"                                      | "1"                                     | 100              | 400         | InvalidInstrumentId                 |
            | Invalid Instrument Id: The blank Instrument Id                       | +H6286280211H2332206149191866L81032H            | ""                                       | "1"                                     | 100              | 400         | InvalidInstrumentId                 |
            | Invalid Instrument Id: Instrument Id is max length                   | +H6286280211H2332206149191866L81032H            | "Instrument Id more than 255 characters" | "1"                                     | 100              | 400         | InvalidInstrumentId                 |
            | Invalid Container Id: Invalid value                                  | +H6286280171H2320614223350612F43307H            | "1"                                      | "3"                                     | 100              | 400         | NotMapReagentTypeWithContainer      |
            | Invalid Container Id: Invalid value                                  | +H6286280221H2320614221625960H38119H            | "1"                                      | "2"                                     | 100              | 400         | NotMapReagentTypeWithContainer      |
            | Invalid Container Id: Invalid value                                  | +H6286280811H2320614225670852K26245H            | "1"                                      | "23"                                    | 100              | 400         | InvalidContainerId                  |
            | Invalid Container Id: Invalid value                                  | +H6286280181H2320614221754364M62235H            | "1"                                      | "0"                                     | 100              | 400         | InvalidContainerId                  |
            | Invalid Container Id: Mixing special characters                      | +H6286280181H2320614221754364M62235H            | "1"                                      | "1@"                                    | 100              | 400         | InvalidContainerId                  |
            | Invalid Container Id: Mixing space characters                        | +H6286280181H2320614221754364M62235H            | "1"                                      | " 1 "                                   | 100              | 400         | InvalidContainerId                  |
            | Invalid Container Id: Only space characters                          | +H6286280181H2320614221754364M62235H            | "1"                                      | "  "                                    | 100              | 400         | InvalidContainerId                  |
            | Invalid Container Id: Mixing alpha                                   | +H6286280181H2320614221754364M62235H            | "1"                                      | "L"                                     | 100              | 400         | InvalidContainerId                  |
            | Invalid Container Id: The blank Container Id                         | +H6286280211H2320614225252930L42572H            | "1"                                      | ""                                      | 100              | 400         | InvalidContainerId                  |
            | Invalid Container Id: Container Id is max length                     | +H6286280211H2320614225252930L42572H            | "1"                                      | "Container Id more than 255 characters" | 100              | 400         | InvalidContainerId                  |
            | Invalid Instrument Id, Container Id, Cycles Remaining                | +H6286280171H2320613225299519F06933H            | "2"                                      | "3"                                     | 0                | 400         | InvalidInstrumentId                 |
            | Miss the cyclesRemaining field                                       | +H6286280171H2332206159184796F10698H            | "1"                                      | "1"                                     | Missing          | 400         | InvalidCyclesRemaining              |
            | Miss the instrumentId field                                          | +H6286280811H2332206152890243K46128H            | "Missing"                                | "4"                                     | 100              | 400         | InvalidInstrumentId                 |
            | Miss the containerId field                                           | +H6286280811H2332206152890243K46128H            | "1"                                      | "Missing"                               | 100              | 400         | InvalidContainerId                  |
            | Miss Instrument Id and Container Id                                  | +H6286280211H2332206157520289L28152H            | "Missing"                                | "Missing"                               | 100              | 400         | InvalidInstrumentId                 |
            | Miss Container Id and Cycles Remaining                               | +H6286280811H2332206158267207K65555H            | "1"                                      | "Missing"                               | Missing          | 400         | InvalidContainerId                  |
            | Miss Barcode and Container Id                                        | Missing                                         | "1"                                      | "Missing"                               | 100              | 400         | BarcodeMissing                      |
            | Miss Instrument Id And Cycles Remaining                              | +H6286280811H2332206158267207K65555H            | "Missing"                                | "5"                                     | Missing          | 400         | InvalidInstrumentId                 |
            | Invalid Barcode and miss Container Id                                | +H6286280181H232616222218924M33224H             | "1"                                      | "Missing"                               | 100              | 400         | InvalidBarcodeLength                |
            | Invalid Container Id and miss Cycles Remaining                       | +H6286280171H2320612227634809F72998H            | "1"                                      | "3"                                     | Missing          | 400         | InvalidCyclesRemaining              |
            | Miss Instrument Id, Container Id, Cycles Remaining                   | +H6286280811H2320616228155186K67768H            | "Missing"                                | "Missing"                               | Missing          | 400         | InvalidInstrumentId                 |
            | Miss Instrument Id, Container Id and invalid Cycles Remaining        | +H6286280211H2320616228673852L44826H            | "Missing"                                | "Missing"                               | 0                | 400         | InvalidInstrumentId                 |
            | Invalid Barcode and Miss Instrument Id, Container Id                 | +H6286280181H232061622@076508M48231H            | "Missing"                                | "Missing"                               | 100              | 400         | InvalidBarcode                      |
            | The Cycles Remaining exceeds max length                              | +H6286280811H2320614222329338K19305H            | 1                                        | 4                                       | 11111111111      | 400         | InvalidJsonFormat                   |