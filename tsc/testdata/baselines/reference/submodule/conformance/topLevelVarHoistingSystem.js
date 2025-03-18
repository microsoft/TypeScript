//// [tests/cases/conformance/es6/moduleExportsSystem/topLevelVarHoistingSystem.ts] ////

//// [topLevelVarHoistingSystem.ts]
if (false) {
    var y = 1;
}

function f() {
    console.log(y);
}

export { y };

//// [topLevelVarHoistingSystem.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
if (false) {
    var y = 1;
    exports.y = y;
}
function f() {
    console.log(y);
}
