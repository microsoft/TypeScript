//// [thisInModule.ts]
module myMod {
    var x;
    this.x = 5;
}

//// [thisInModule.js]
var myMod = myMod || (myMod = {});
(function (myMod) {
    var x;
    this.x = 5;
})(myMod);
