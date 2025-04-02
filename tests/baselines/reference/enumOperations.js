//// [tests/cases/compiler/enumOperations.ts] ////

//// [enumOperations.ts]
enum Enum { None = 0 }
var enumType: Enum = Enum.None;
var numberType: number = 0;
var anyType: any = 0;
 
enumType ^ numberType;
numberType ^ anyType;
 
enumType & anyType;
enumType | anyType;
enumType ^ anyType;
~anyType;
enumType <<anyType;
enumType >>anyType;
enumType >>>anyType;


//// [enumOperations.js]
var Enum;
(function (Enum) {
    Enum[Enum["None"] = 0] = "None";
})(Enum || (Enum = {}));
var enumType = Enum.None;
var numberType = 0;
var anyType = 0;
enumType ^ numberType;
numberType ^ anyType;
enumType & anyType;
enumType | anyType;
enumType ^ anyType;
~anyType;
enumType << anyType;
enumType >> anyType;
enumType >>> anyType;
