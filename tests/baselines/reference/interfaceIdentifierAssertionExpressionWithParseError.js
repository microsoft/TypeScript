//// [tests/cases/compiler/interfaceIdentifierAssertionExpressionWithParseError.ts] ////

//// [interfaceIdentifierAssertionExpressionWithParseError.ts]
// These were written with the expectation of parse errors.
const interface = 'x';

interface satisfies string;
interface as string;


//// [interfaceIdentifierAssertionExpressionWithParseError.js]
// These were written with the expectation of parse errors.
var interface = 'x';
string;
string;
