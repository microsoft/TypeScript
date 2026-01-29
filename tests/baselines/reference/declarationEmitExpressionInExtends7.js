//// [tests/cases/compiler/declarationEmitExpressionInExtends7.ts] ////

//// [declarationEmitExpressionInExtends7.ts]
export default class extends SomeUndefinedFunction {}


//// [declarationEmitExpressionInExtends7.js]
export default class extends SomeUndefinedFunction {
}


//// [declarationEmitExpressionInExtends7.d.ts]
export default class extends SomeUndefinedFunction {
}
