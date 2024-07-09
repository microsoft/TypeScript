// @module: commonjs
// @Filename: protoAsIndexInIndexExpression_0.ts
export var x;

// @Filename: protoAsIndexInIndexExpression_1.ts
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