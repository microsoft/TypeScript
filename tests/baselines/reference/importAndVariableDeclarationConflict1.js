//// [importAndVariableDeclarationConflict1.js]
var m;
(function (_m) {
    _m.m = '';
})(m || (m = {}));

var x = m.m;
var x = '';
