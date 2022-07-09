Feature: US_199146 - Validate Reagent Barcode

    #FileName: S5_Barcode_US_199146 - Validate Reagent Barcode - Submit invalid barcode
    #FeatureVersion: 0.2
    #ReviewedBy: TrucTMT1
    
    #Consolidated test cases for better understanding and testing.
    @M231700 @M231702 @M231703 @M231704 @M231705 @M231706 @M231707 @M231708 @M231709 @M231710 @M231712 @M231713 @M231714 @M231715 @M231716 @M231717 @M231718 @M231719 @M231720 @M231721 @M231722 
    @M231723 @M231724 @M231725 @M231727 @M231728 @M231732 @M231734 @M231735 @M231736 @M231737 @M231740 @M231742 @M231744 @M231746 @M231748 @M231750 @M231754 @M231756 @M231758 @M231760 @M231762
    @M231765 @M231766 @M231768 @M231773 @M231775 @M231778 @M231780 @M231782 @M231785 @M231787 @M231789 @M231791 @M231793 @M231796 @M231797 @M231800 @M231801 @M231803 @M231804 @M231807 @M231808
    @M231811 @M231814 @M231816 @M231819 @M231820 @M231814 @M231824 @M231826 @M231829 @M231830 @M231832 @M231833 @M231835 @M231836 @M231838 @M231840 @M231841 @M231843 @M231844 @M231846 @M231847
    @M231848 @M231849 @M231851 @M231855 @M231856 @M231859 @M231861 @M231863 @M231866 @M231868 @M231871 @M231872 @M231874 @M231877 @M231880 @M231882 @M231885 @A246715 @9375_DID_1528 @US199146 @Consumable
    Scenario Outline: 246715_Submit invalid barcode 
        Given Invalid barcode
        When A GET request with <Invalid barcode> is sent to the Reagent Setup API
        Then The Reagent Setup API will respond with Status Code "<Status Code>"
        And The Reagent Setup API will respond with Error Code "<Error Code>"

        Examples:
            | Note                                                                  | Invalid barcode                                  | Status Code | Error Code                          |
            | Empty barcode                                                         | " "                                              | 400         | BarcodeMissing                      |
            | Mixing lowercase letters                                              | "+h6286280170n1132201319547740F03768n"           | 400         | InvalidManufacturer                 |
            | Mixing lowercase letters                                              | "+H6286280810M1132201317581762k34851m"           | 400         | InvalidReagentTypeId                |
            | Mixing lowercase letters                                              | "+h6286280220N1132201312679674h03949N"           | 400         | InvalidManufacturer                 |
            | Mixing lowercase letters                                              | "+H6286280810t1132201317581762k34851m"           | 400         | InvalidReagentTypeId                |
            | Invalid Start Character                                               | "-H6286280171D2232705229109810F01151D"           | 400         | InvalidBarcode                      |
            | Invalid Start Character                                               | "aH6286280171D2232705229109810F01151D"           | 400         | InvalidBarcode                      |
            | Invalid Start Character                                               | "1H6286280171D2232705229109810F01151D"           | 400         | InvalidBarcode                      |
            | Invalid Start Character                                               | "MH6286280171D2232705229109810F01151D"           | 400         | InvalidBarcode                      |
            | Input special characters                                              | "!@#$%^&*()!@#$%^&*()!@#$%^&*()!@#$%^"           | 400         | InvalidBarcode                      |
            | Invalid Reagent Manufacturer: Mixing alpha numeric                    | "+H6236280210Q2532201096703424L84204Q"           | 400         | InvalidManufacturer                 |
            | Invalid Reagent Manufacturer: Mixing lowercase letters                | "+h6286280181B2332201144685767M87955B"           | 400         | InvalidManufacturer                 |
            | Invalid Reagent Manufacturer: Only numeric                            | "+06286280171M2032201094789863F70426M"           | 400         | InvalidManufacturer                 |
            | Invalid Reagent Manufacturer: Only alpha                              | "+ABCD6280171M2032201094789863F70426M"           | 400         | InvalidManufacturer                 |
            | Invalid Reagent Manufacturer: Mixing special characters               | "+@6286280181B2332201144685767M87955B"           | 400         | InvalidBarcode                      |
            | Invalid Reagent Manufacturer: Mixing special characters               | "+H62+6280181B2332201144685767M87955B"           | 400         | InvalidBarcode                      |
            | Invalid Reagent Manufacturer: Only space characters                   | "+    6280181B2332201144685767M87955B"           | 400         | BarcodeContainsSpace                |
            | Invalid Reagent Manufacturer: Only special characters                 | "+@***6280811K2032201091535842K54299K"           | 400         | InvalidBarcode                      |
            | Invalid Reagent Product Number: Mixing alpha numeric                  | "+H62862TR171M2032201094789863F70426M"           | 400         | InvalidReagentProductNumber         |
            | Invalid Reagent Product Number: Only alpha                            | "+H628tttabc1M2032201094789863F70426M"           | 400         | InvalidReagentProductNumber         |
            | Invalid Reagent Product Number: Mixing special characters             | "+H628@343811B2332201144685767M87955B"           | 400         | InvalidBarcode                      |
            | Invalid Reagent Product Number: Only space characters                 | "+H628      1B2332201144685767M87955B"           | 400         | BarcodeContainsSpace                |
            | Invalid Reagent Product Number: Only special characters               | "+H628&&&&&&1K2032201091535842K54299K"           | 400         | InvalidBarcode                      |
            | Invalid Expiration Date Format                                        | "+H6286280171D22!2705229109810F01151D"           | 400         | InvalidBarcode                      |
            | Invalid Expiration Date Format                                        | "+H6286280171D22f2705229109810F01151D"           | 400         | InvalidExpirationDateFormat         |
            | Invalid Expiration Date Format                                        | "+H6286280171D2242705229109810F01151D"           | 400         | InvalidExpirationDateFormat         |
            | Invalid Expiration Date Format                                        | "+H6286280171D22312705229109810F01151D"          | 400         | InvalidBarcodeLength                |
            | Invalid Expiration Date Format                                        | "+H6286280171D223+2705229109810F01151D"          | 400         | InvalidBarcodeLength                |
            | Invalid Expiration Date Format                                        | "+H6286280171D222705229109810F01151D"            | 400         | InvalidBarcodeLength                |
            | Invalid Expiration Date                                               | "+H6286280171D223!705229109810F01151D"           | 400         | InvalidBarcode                      |
            | Invalid Expiration Date                                               | "+H6286280171D223f705229109810F01151D"           | 400         | InvalidExpirationDate               |
            | Invalid Expiration Date                                               | "+H6286280171D22327052219109810F01151D"          | 400         | InvalidBarcodeLength                |
            | Invalid Expiration Date                                               | "+H6286280171D223270522+9109810F01151D"          | 400         | InvalidBarcodeLength                |
            | Invalid Expiration Date                                               | "+H6286280171D223270529109810F01151D"            | 400         | InvalidBarcodeLength                |
            | Invalid Expiration Date                                               | "+H6286280811H232      9818714K81424H"           | 400         | BarcodeContainsSpace                |
            | Invalid Reagent Lot Number: Mixing alpha numeric                      | "+H6286280171K203220109694acb7F02372K"           | 400         | InvalidReagentLotNumber             |
            | Invalid Reagent Lot Number: Only alpha                                | "+H6286280171M203220109tructmtF06944M"           | 400         | InvalidReagentLotNumber             |
            | Invalid Reagent Lot Number: Mixing special characters                 | "+H6281858891Q34201162223@"                      | 400         | InvalidBarcodeLength                |
            | Invalid Reagent Lot Number: Only space characters                     | "+H6286280171K203220109       F84292K"           | 400         | BarcodeContainsSpace                |
            | Invalid Reagent Lot Number: Only special characters                   | "+H6281858891Q342011622@@@@@@@K61112Q"           | 400         | InvalidBarcode                      |
            | Invalid Reagent Lot Number: Over criteria length                      | "+H6286280811H23206272298187144K81424H"          | 400         | InvalidBarcodeLength                |
            | Invalid Reagent Lot Number: Lack of criteria length                   | "+H6286280811H232062722981871K81424H"            | 400         | InvalidBarcodeLength                |
            | Invalid Reagent Type ID: Only numeric                                 | "+H6286280170M2332201154307861947966M"           | 400         | InvalidReagentTypeId                |
            | Invalid Reagent Type ID: Mixing lowercase letters                     | "+H6286280221J1132201314506476h38874J"           | 400         | InvalidReagentTypeId                |
            | Invalid Reagent Type ID: Only space characters                        | "+H6286280211H2332201157904622 86985H"           | 400         | BarcodeContainsSpace                |
            | Invalid Reagent Type ID: Only special characters                      | "+H6286280221A2332201152201848@64811A"           | 400         | InvalidBarcode                      |
            | Reagent Type ID is not in the pre-defined list                        | "+H6286280171M2032201094789863G70426M"           | 400         | InvalidReagentTypeId                |
            | Reagent Type ID is not in the pre-defined list                        | "+H6286280171M2032201094789863B70426M"           | 400         | InvalidReagentTypeId                |
            | Invalid Reagent Sequence Number: Mixing alpha numeric                 | "+H6286280171H2320623226383261F553abH"           | 400         | InvalidBottleSequenceNumber         |
            | Invalid Reagent Sequence Number: Only alpha                           | "+H6286280171H2320623226383261F5abcdH"           | 400         | InvalidBottleSequenceNumber         |
            | Invalid Reagent Sequence Number: Mixing special characters            | "+H6286280171H2320623226383261F553@#H"           | 400         | InvalidBarcode                      |
            | Invalid Reagent Sequence Number: Only space characters                | "+H6286280171H2320623226383261F5    H"           | 400         | BarcodeContainsSpace                |
            | Invalid Reagent Sequence Number: Only special characters              | "+H6286280171H2320623226383261F5@#$%H"           | 400         | InvalidBarcode                      |
            | Invalid Reagent Sequence Number: Over criteria length                 | "+H6286280171H2320623226383261F553822H"          | 400         | InvalidBarcodeLength                |
            | Invalid Reagent Sequence Number: Lack of criteria length              | "+H6286280171H2320623226383261F5538H"            | 400         | InvalidBarcodeLength                |
            | Reagent Part Number does not match valid Reagent Type ID              | "+H6286280171M2032201094789863K70426M"           | 400         | ProductNumberAndReagentTypeMismatch |
            | Reagent Part Number does not match valid Reagent Type ID              | "+H6286280210Q2532201096703424M84204Q"           | 400         | ProductNumberAndReagentTypeMismatch |
            | Reagent Part Number does not match valid Reagent Type ID              | "+H6286280181B2332201144685767H87955B"           | 400         | ProductNumberAndReagentTypeMismatch |
            | Reagent Part Number is not in the pre-defined list                    | "+H6286280191M2032201094789863F70426M"           | 400         | InvalidReagentProductNumber         |
            | Reagent Part Number is not in the pre-defined list                    | "+H6285280171M2032201094789863F70426M"           | 400         | InvalidReagentProductNumber         |
            | Barcode more than 36 characters                                       | "+H6286280170M1121227216946014F81321M12345"      | 400         | InvalidBarcodeLength                |
            | Barcode more than 36 characters and the first invalid                 | "AB+H6286280170H1832202138962464F28009HAB"       | 400         | InvalidBarcodeLength                |
            | Barcode more than 36 characters and the first invalid                 | "H6286280810Q112LKJGFD7077707K31975Q6789ABC"     | 400         | InvalidBarcodeLength                |
            | Barcode more than 36 characters and include space characters          | " +H6286280170M1121227216946014F81321M12345"     | 400         | InvalidBarcodeLength                |
            | Barcode more than 36 characters and include space characters          | "+H6286280170H    202138962464F28009Hspace"      | 400         | InvalidBarcodeLength                |
            | Barcode more than 36 characters and include space characters          | "+H6286280810Q112LKJGFD7077707K31975Q6789ABC "   | 400         | InvalidBarcodeLength                |
            | Barcode with more than 36 characters and include special characters   | "+H6286280170M1121227216946014F81321M1==$23"     | 400         | InvalidBarcodeLength                |
            | Barcode with more than 36 characters and include special characters   | "#     H6286280170H    202138962464F28009Hspace" | 400         | InvalidBarcodeLength                |
            | Barcode with more than 36 characters and include special characters   | "@H6286280810Q112LKJGFD7077707K31975Q6789ABC!!"  | 400         | InvalidBarcodeLength                |
            | Barcode with less than 36 characters                                  | "+"                                              | 400         | InvalidBarcodeLength                |
            | Barcode with less than 36 characters                                  | "+H628"                                          | 400         | InvalidBarcodeLength                |
            | Barcode with less than 36 characters                                  | "+H6286280170M1121227216946F"                    | 400         | InvalidBarcodeLength                |
            | Barcode with less than 36 characters                                  | "H6286280170M1121227216946014F81321"             | 400         | InvalidBarcodeLength                |
            | Barcode with less than 36 characters                                  | "ABCD"                                           | 400         | InvalidBarcodeLength                |
            | Barcode less than 36 characters and include space characters          | "+H6286280810Q112      7077707K31975"            | 400         | InvalidBarcodeLength                |
            | Barcode less than 36 characters and include space characters          | "+              H6286280220M11"                  | 400         | InvalidBarcodeLength                |
            | Barcode less than 36 characters and include space characters          | "+H6286280810Q  "                                | 400         | InvalidBarcodeLength                |
            | Barcode with less than 36 characters and include special characters   | "+H6286280810Q112<7077707K"                      | 400         | InvalidBarcodeLength                |
            | Barcode with less than 36 characters and include special characters   | "^H6286280220*M11"                               | 400         | InvalidBarcodeLength                |
            | Barcode with less than 36 characters and include special characters   | "@H6286280810Q112LKJGFD70777"                    | 400         | InvalidBarcodeLength                |            
            | Barcode with space characters in front of the barcode                 | "      280171M1121227214453541F02304M"           | 400         | BarcodeContainsSpace                |
            | Barcode with space characters in front of the barcode                 | "      +H6286280220N1121227218537293H"           | 400         | BarcodeContainsSpace                |
            | Barcode with space characters in the middle of the barcode            | "+H628     11H1120215229764252K36301H"           | 400         | BarcodeContainsSpace                |
            | Barcode with space characters in the middle of the barcode            | "+H628628022 T1120215229411044H67050T"           | 400         | BarcodeContainsSpace                |
            | Barcode with space characters in the middle of the barcode            | "+H62   8022 T11202 5229411 44H67 50T"           | 400         | BarcodeContainsSpace                |
            | Barcode with space characters at the end of the barcode               | "+H6286280810R1120215227783243K8122  "           | 400         | BarcodeContainsSpace                |
            | Barcode with space characters at the end of the barcode               | "+H6286280181M112021522600601234434  "           | 400         | BarcodeContainsSpace                |
            | Invalid Reagent Shelf Life Expiration Date: Mixing alpha numeric      | "+H6286280170Q2320aa5B29564781F00614Q"           | 400         | InvalidExpirationDate               |
            | Invalid Reagent Shelf Life Expiration Date: Only alpha                | "+H6286280810Q112LKJGFD7077707K31975Q"           | 400         | InvalidExpirationDate               |
            | Invalid Reagent Shelf Life Expiration Date: Mixing special characters | "+H6286280211N113$202145027777L62060N"           | 400         | InvalidBarcode                      |
            | Invalid Reagent Shelf Life Expiration Date: Only space characters     | "+H6286280810M113      7432910K08105M"           | 400         | BarcodeContainsSpace                |
            | Invalid Reagent Shelf Life Expiration Date: Only special characters   | "+H6286280220M112@@@@@@7347745H52026M"           | 400         | InvalidBarcode                      |
            | Invalid Reagent Shelf Life Expiration Date: The day does not exists   | "+H6286280220P1121545229460417H30040P"           | 400         | InvalidExpirationDate               |
            | Invalid combine between Expiration Date Format And Expiration Date    | "+H6286280171D2222705229109810F01151D"           | 400         | InvalidExpirationDate               |
            | Invalid combine between Expiration Date Format And Expiration Date    | "+H6286280221D2232723609109810H01151D"           | 400         | InvalidExpirationDate               |

    #FileName: S5_Barcode_US_199146 - Validate reagent barcode - Submit barcode with invalid Reagent Product Number - Check status code
    #FeatureVersion: 0.2
    #ReviewedBy: TrucTMT1
    
    #Consolidated test cases for better understanding and testing.
    @M231729 @M231730 @A246716 @9375_DID_1528 @US199146 @Consumable
    Scenario Outline: 246716_Submit barcode with invalid Reagent Product Number Check status code
        Given Invalid barcode
        When A GET request with "<Invalid barcode>" is sent to the Reagent Setup API
        Then The Reagent Setup API will respond with Status Code "<Status Code>"

        Examples:
            | Note                                     | Invalid barcode                      | Status Code |
            | Mixing special characters                | +H628/343811B2332201144685767M87955B | 404         |
            | Special characters at the start position | /H628/280210Q2532202096703424L84204Q | 404         |