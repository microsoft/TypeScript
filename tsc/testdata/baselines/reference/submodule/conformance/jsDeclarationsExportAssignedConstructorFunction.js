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
export declare var MyClass: () => void;
