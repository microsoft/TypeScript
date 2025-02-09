//// [tests/cases/compiler/typeIdentifierAssertionExpression.ts] ////

//// [typeIdentifierAssertionExpression.ts]
const type = 'x';

type satisfies string;
type as string;


//// [typeIdentifierAssertionExpression.js]
var type = 'x';
type;
type;
