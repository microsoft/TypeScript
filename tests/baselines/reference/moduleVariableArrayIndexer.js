//// [tests/cases/compiler/moduleVariableArrayIndexer.ts] ////

//// [moduleVariableArrayIndexer.ts]
module Bar {
    export var a = 1;
    var t = undefined[a][a]; // CG: var t = undefined[Bar.a][a];
}


//// [moduleVariableArrayIndexer.js]
var Bar;
(function (Bar) {
    Bar.a = 1;
    var t = undefined[Bar.a][Bar.a]; // CG: var t = undefined[Bar.a][a];
})(Bar || (Bar = {}));
