//// [enumWithPrimitiveName.ts]
enum string { }
enum number { }
enum any { }

//// [enumWithPrimitiveName.js]
var string = string || (string = {});
(function (string) {
})(string);
var number = number || (number = {});
(function (number) {
})(number);
var any = any || (any = {});
(function (any) {
})(any);
