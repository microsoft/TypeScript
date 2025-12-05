//// [tests/cases/compiler/moduleVariables.ts] ////

//// [moduleVariables.ts]
declare var console: any;
 
var x = 1;
namespace M {
    export var x = 2;
    console.log(x); // 2
}
 
namespace M {
    console.log(x); // 2
}
 
namespace M {
    var x = 3;
    console.log(x); // 3
}


//// [moduleVariables.js]
var x = 1;
var M;
(function (M) {
    M.x = 2;
    console.log(M.x); // 2
})(M || (M = {}));
(function (M) {
    console.log(M.x); // 2
})(M || (M = {}));
(function (M) {
    var x = 3;
    console.log(x); // 3
})(M || (M = {}));
