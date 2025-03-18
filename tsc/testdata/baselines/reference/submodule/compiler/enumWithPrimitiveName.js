//// [tests/cases/compiler/enumWithPrimitiveName.ts] ////

//// [enumWithPrimitiveName.ts]
enum string { }
enum number { }
enum any { }

//// [enumWithPrimitiveName.js]
var string;
(function (string) {
})(string || (string = {}));
var number;
(function (number) {
})(number || (number = {}));
var any;
(function (any) {
})(any || (any = {}));
