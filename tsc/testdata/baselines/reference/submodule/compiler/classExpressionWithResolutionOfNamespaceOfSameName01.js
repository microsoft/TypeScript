//// [tests/cases/compiler/classExpressionWithResolutionOfNamespaceOfSameName01.ts] ////

//// [classExpressionWithResolutionOfNamespaceOfSameName01.ts]
namespace C {
    export interface type {
    }
}

var x = class C {
    prop: C.type;
}

//// [classExpressionWithResolutionOfNamespaceOfSameName01.js]
var x = class C {
    prop;
};
