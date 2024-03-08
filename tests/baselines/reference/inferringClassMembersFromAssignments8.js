//// [tests/cases/conformance/salsa/inferringClassMembersFromAssignments8.ts] ////

//// [inferringClassMembersFromAssignments8.ts]
// no inference in TS files, even for `this` aliases:

var app = function() {
    var _this = this;
    _this.swap = function() { }
}
var a = new app()
a


//// [inferringClassMembersFromAssignments8.js]
// no inference in TS files, even for `this` aliases:
var app = function () {
    var _this = this;
    _this.swap = function () { };
};
var a = new app();
a;
