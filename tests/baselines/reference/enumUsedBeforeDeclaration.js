//// [enumUsedBeforeDeclaration.ts]
const v: Color = Color.Green;
const v2: ConstColor = ConstColor.Green;
enum Color { Red, Green, Blue }
const enum ConstColor { Red, Green, Blue }



//// [enumUsedBeforeDeclaration.js]
var v = Color.Green;
var v2 = 1 /* Green */;
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
