//// [ModuleWithExportedAndNonExportedEnums.js]
var A;
(function (A) {
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Blue"] = 1] = "Blue";
    })(A.Color || (A.Color = {}));
    var Color = A.Color;
    var Day;
    (function (Day) {
        Day[Day["Monday"] = 0] = "Monday";
        Day[Day["Tuesday"] = 1] = "Tuesday";
    })(Day || (Day = {}));
})(A || (A = {}));

// not an error since exported
var a = 0 /* Red */;

// error not exported
var b = A.Day.Monday;
