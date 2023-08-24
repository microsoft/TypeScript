//// [tests/cases/compiler/emptyEnum.ts] ////

//// [emptyEnum.ts]
enum E {
}

//// [emptyEnum.js]
var E;
(function (E) {
})(E || (E = {}));
