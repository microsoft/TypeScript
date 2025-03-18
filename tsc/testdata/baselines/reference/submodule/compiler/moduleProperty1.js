//// [tests/cases/compiler/moduleProperty1.ts] ////

//// [moduleProperty1.ts]
module M {
    var x=10;  // variable local to this module body
    var y=x;  // property visible only in module
    export var z=y;  // property visible to any code
}

module M2 {
    var x = 10;  // variable local to this module body
    private y = x;  // can't use private in modules
    export var z = y;  // property visible to any code
}

//// [moduleProperty1.js]
var M;
(function (M) {
    var x = 10;
    var y = x;
    M.z = y;
})(M || (M = {}));
var M2;
(function (M2) {
    var x = 10;
    y = x;
    M2.z = y;
})(M2 || (M2 = {}));
