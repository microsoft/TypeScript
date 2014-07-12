//// [enumIdenticalIdentifierValues.ts]
enum Enum {
    1,
    1.0
}

//// [enumIdenticalIdentifierValues.js]
var Enum;
(function (Enum) {
    Enum[Enum["1"] = 0] = "1";
    Enum[Enum["1"] = 1] = "1";
})(Enum || (Enum = {}));
