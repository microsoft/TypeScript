//// [missingCloseBraceInEnum.ts]
enum Colors {
  Red,
  Green,
  Blue,



//// [missingCloseBraceInEnum.js]
var Colors;
(function (Colors) {
    Colors[Colors["Red"] = 0] = "Red";
    Colors[Colors["Green"] = 1] = "Green";
    Colors[Colors["Blue"] = 2] = "Blue";
})(Colors || (Colors = {}));
