//// [tests/cases/compiler/declarationEmitTypeAliasTypeParameterExtendingUnknownSymbol.ts] ////

//// [declarationEmitTypeAliasTypeParameterExtendingUnknownSymbol.ts]
type A<T extends Unknown> = {}

//// [declarationEmitTypeAliasTypeParameterExtendingUnknownSymbol.js]


//// [declarationEmitTypeAliasTypeParameterExtendingUnknownSymbol.d.ts]
type A<T extends Unknown> = {};
