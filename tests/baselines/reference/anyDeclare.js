//// [anyDeclare.ts]
declare var x: any;
module myMod {
    var myFn;
    function myFn() {  }
}


//// [anyDeclare.js]
var myMod = myMod || (myMod = {});
(function (myMod) {
    var myFn;
    function myFn() { }
})(myMod);
