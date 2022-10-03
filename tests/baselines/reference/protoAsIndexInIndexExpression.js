//// [tests/cases/compiler/protoAsIndexInIndexExpression.ts] ////

//// [protoAsIndexInIndexExpression_0.ts]
export var x;

//// [protoAsIndexInIndexExpression_1.ts]
///<reference path='protoAsIndexInIndexExpression_0.ts'/>
var EntityPrototype = undefined;
var WorkspacePrototype = {
    serialize: function (): any {
    }
};
WorkspacePrototype['__proto__'] = EntityPrototype;

var o = {
    "__proto__": 0
};
class C {
    "__proto__" = 0;
}

//// [protoAsIndexInIndexExpression_0.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
//// [protoAsIndexInIndexExpression_1.js]
///<reference path='protoAsIndexInIndexExpression_0.ts'/>
var EntityPrototype = undefined;
var WorkspacePrototype = {
    serialize: function () {
    }
};
WorkspacePrototype['__proto__'] = EntityPrototype;
var o = {
    "__proto__": 0
};
var C = /** @class */ (function () {
    function C() {
        this["__proto__"] = 0;
    }
    return C;
}());
