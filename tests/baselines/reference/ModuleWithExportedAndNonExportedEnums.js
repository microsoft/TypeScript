//// [ModuleWithExportedAndNonExportedEnums.ts]
module A {
    export enum Color { Red, Blue }
    enum Day { Monday, Tuesday }
}

// not an error since exported
var a: A.Color = A.Color.Red;

// error not exported
var b = A.Day.Monday;


//// [ModuleWithExportedAndNonExportedEnums.js]
var A = A || (A = {});
(function (A) {
    var Color = A.Color || (A.Color = {});
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Blue"] = 1] = "Blue";
    })(Color);
    var Day = Day || (Day = {});
    (function (Day) {
        Day[Day["Monday"] = 0] = "Monday";
        Day[Day["Tuesday"] = 1] = "Tuesday";
    })(Day);
})(A);
// not an error since exported
var a = A.Color.Red;
// error not exported
var b = A.Day.Monday;
