// @allowJS: true
// @noEmit: true

// @filename: a.ts
import b = require("./b.js");
b.func1;
b.func2;
b.func3;
b.func4;
b.func5;
b.func6;
b.func7;
b.func8;
b.func9;
b.func10;
b.func11;
b.func12;
b.func13;
b.func14;
b.func15;
b.func16;
b.func17;
b.func18;
b.func19;
b.func20;


// @filename: b.js
var exportsAlias = exports;
exportsAlias.func1 = function () { };
exports.func2 = function () { };

var moduleExportsAlias = module.exports;
moduleExportsAlias.func3 = function () { };
module.exports.func4 = function () { };

var multipleDeclarationAlias1 = exports = module.exports;
multipleDeclarationAlias1.func5 = function () { };

var multipleDeclarationAlias2 = module.exports = exports;
multipleDeclarationAlias2.func6 = function () { };

var someOtherVariable;
var multipleDeclarationAlias3 = someOtherVariable = exports;
multipleDeclarationAlias3.func7 = function () { };

var multipleDeclarationAlias4 = someOtherVariable = module.exports;
multipleDeclarationAlias4.func8 = function () { };

var multipleDeclarationAlias5 = module.exports = exports = {};
multipleDeclarationAlias5.func9 = function () { };

var multipleDeclarationAlias6 = exports = module.exports = {};
multipleDeclarationAlias6.func10 = function () { };

exports = module.exports = someOtherVariable = {};
exports.func11 = function () { };
module.exports.func12 = function () { };

exports = module.exports = someOtherVariable = {};
exports.func11 = function () { };
module.exports.func12 = function () { };

exports = module.exports = {};
exports.func13 = function () { };
module.exports.func14 = function () { };

exports = module.exports = {};
exports.func15 = function () { };
module.exports.func16 = function () { };

module.exports = exports = {};
exports.func17 = function () { };
module.exports.func18 = function () { };

module.exports = {};
exports.func19 = function () { };
module.exports.func20 = function () { };

