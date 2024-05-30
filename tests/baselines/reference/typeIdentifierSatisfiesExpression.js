//// [tests/cases/compiler/typeIdentifierSatisfiesExpression.ts] ////

//// [typeIdentifierSatisfiesExpression.ts]
const type = 'x';

type satisfies string;
type as string;


//// [typeIdentifierSatisfiesExpression.js]
var type = 'x';
type;
type;
