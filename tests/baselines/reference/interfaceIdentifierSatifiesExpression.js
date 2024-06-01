//// [tests/cases/compiler/interfaceIdentifierSatifiesExpression.ts] ////

//// [interfaceIdentifierSatifiesExpression.ts]
// These were written with the expectation of parse errors.
const interface = 'x';

interface satisfies string;
interface as string;


//// [interfaceIdentifierSatifiesExpression.js]
// These were written with the expectation of parse errors.
var interface = 'x';
string;
string;
