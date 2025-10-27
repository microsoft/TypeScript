//// [tests/cases/compiler/thisInModule.ts] ////

//// [thisInModule.ts]
namespace myMod {
    var x;
    this.x = 5;
}

//// [thisInModule.js]
var myMod;
(function (myMod) {
    var x;
    this.x = 5;
})(myMod || (myMod = {}));
