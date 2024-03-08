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
System.register([], function (exports_1, context_1) {
    "use strict";
    var y;
    var __moduleName = context_1 && context_1.id;
    function f() {
        console.log(y);
    }
    return {
        setters: [],
        execute: function () {
            if (false) {
                y = 1;
                exports_1("y", y);
            }
        }
    };
});
