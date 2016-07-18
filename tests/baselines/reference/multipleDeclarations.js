//// [input.js]

function C() {
    this.m = null;
}
C.prototype.m = function() {
    this.nothing();
};


//// [output.js]
function C() {
    this.m = null;
}
C.prototype.m = function () {
    this.nothing();
};
