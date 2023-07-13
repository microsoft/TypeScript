//// [tests/cases/compiler/collisionExportsRequireAndFunctionInGlobalFile.ts] ////

//// [collisionExportsRequireAndFunctionInGlobalFile.ts]
function exports() {
    return 1;
}
function require() {
    return "require";
}
module m3 {
    function exports() {
        return 1;
    }
    function require() {
        return "require";
    }
}
module m4 {
    export function exports() {
        return 1;
    }
    export function require() {
        return "require";
    }
}

//// [collisionExportsRequireAndFunctionInGlobalFile.js]
function exports() {
    return 1;
}
function require() {
    return "require";
}
var m3;
(function (m3) {
    function exports() {
        return 1;
    }
    function require() {
        return "require";
    }
})(m3 || (m3 = {}));
var m4;
(function (m4) {
    function exports() {
        return 1;
    }
    m4.exports = exports;
    function require() {
        return "require";
    }
    m4.require = require;
})(m4 || (m4 = {}));
