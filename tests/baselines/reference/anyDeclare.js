//// [anyDeclare.ts]
declare var x: any;
module myMod {
    var myFn;
    function myFn() {  }
}


//// [anyDeclare.js]
var myMod;
(function (myMod) {
    var myFn;
    function myFn() { }
})(myMod || (myMod = {}));
