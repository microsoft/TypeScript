//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportAssignedConstructorFunction.ts] ////

//// [jsDeclarationsExportAssignedConstructorFunction.js]
/** @constructor */
module.exports.MyClass = function() {
    this.x = 1
}
module.exports.MyClass.prototype = {
    a: function() {
    }
}


//// [jsDeclarationsExportAssignedConstructorFunction.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @constructor */
export var MyClass = function () {
    this.x = 1;
};
/** @constructor */
module.exports.MyClass = function () {
    this.x = 1;
};
module.exports.MyClass.prototype = {
    a: function () {
    }
};


//// [jsDeclarationsExportAssignedConstructorFunction.d.ts]
/** @constructor */
export var MyClass = function ();;
export {};


//// [DtsFileErrors]


out/jsDeclarationsExportAssignedConstructorFunction.d.ts(2,33): error TS1005: '{' expected.


==== out/jsDeclarationsExportAssignedConstructorFunction.d.ts (1 errors) ====
    /** @constructor */
    export var MyClass = function ();;
                                    ~
!!! error TS1005: '{' expected.
    export {};
    