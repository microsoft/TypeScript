//// [tests/cases/compiler/interfaceIdentifierAssertionExpressionWithParseError.ts] ////

//// [interfaceIdentifierAssertionExpressionWithParseError.ts]
const interface = 'x';

interface satisfies string;
interface as string;


//// [interfaceIdentifierAssertionExpressionWithParseError.js]
var interface = 'x';
string;
string;
