//// [tests/cases/compiler/anyDeclare.ts] ////

//// [anyDeclare.ts]
declare var x: any;
namespace myMod {
    var myFn;
    function myFn() {  }
}


//// [anyDeclare.js]
var myMod;
(function (myMod) {
    var myFn;
    function myFn() { }
})(myMod || (myMod = {}));
