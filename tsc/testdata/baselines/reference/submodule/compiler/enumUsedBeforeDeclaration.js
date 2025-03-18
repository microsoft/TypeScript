//// [tests/cases/compiler/enumUsedBeforeDeclaration.ts] ////

//// [enumUsedBeforeDeclaration.ts]
const v: Color = Color.Green;
const v2: ConstColor = ConstColor.Green;
enum Color { Red, Green, Blue }
const enum ConstColor { Red, Green, Blue }



//// [enumUsedBeforeDeclaration.js]
const v = Color.Green;
const v2 = ConstColor.Green;
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var ConstColor;
(function (ConstColor) {
    ConstColor[ConstColor["Red"] = 0] = "Red";
    ConstColor[ConstColor["Green"] = 1] = "Green";
    ConstColor[ConstColor["Blue"] = 2] = "Blue";
})(ConstColor || (ConstColor = {}));
