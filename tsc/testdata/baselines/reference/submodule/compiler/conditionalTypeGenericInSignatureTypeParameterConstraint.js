//// [tests/cases/compiler/conditionalTypeGenericInSignatureTypeParameterConstraint.ts] ////

//// [conditionalTypeGenericInSignatureTypeParameterConstraint.ts]
// should be x
type H_inline1<x> = (<o extends x>() => o) extends (() => infer o) ? o : never;

type Result = H_inline1<string>; // should be `string`

//// [conditionalTypeGenericInSignatureTypeParameterConstraint.js]
