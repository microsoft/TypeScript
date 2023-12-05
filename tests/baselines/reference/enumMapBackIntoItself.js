//// [tests/cases/compiler/enumMapBackIntoItself.ts] ////

//// [enumMapBackIntoItself.ts]
enum TShirtSize {
   Small,
   Medium,
   Large
}
var mySize = TShirtSize.Large;
var test = TShirtSize[mySize];
// specifically checking output here, bug was that test used to be undefined at runtime
test + ''

//// [enumMapBackIntoItself.js]
var TShirtSize;
(function (TShirtSize) {
    TShirtSize[TShirtSize["Small"] = 0] = "Small";
    TShirtSize[TShirtSize["Medium"] = 1] = "Medium";
    TShirtSize[TShirtSize["Large"] = 2] = "Large";
})(TShirtSize || (TShirtSize = {}));
var mySize = TShirtSize.Large;
var test = TShirtSize[mySize];
// specifically checking output here, bug was that test used to be undefined at runtime
test + '';
