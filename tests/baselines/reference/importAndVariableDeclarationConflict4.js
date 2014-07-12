//// [importAndVariableDeclarationConflict4.js]
var m;
(function (_m) {
    _m.m = '';
})(m || (m = {}));

var x = '';
var x = m.m;
