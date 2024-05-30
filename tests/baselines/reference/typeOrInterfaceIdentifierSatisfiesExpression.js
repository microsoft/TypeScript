//// [tests/cases/compiler/typeOrInterfaceIdentifierSatisfiesExpression.ts] ////

//// [typeOrInterfaceIdentifierSatisfiesExpression.ts]
const type = 'x';

type satisfies string;
type as string;

const interface = 'x';

interface satisfies string;
interface as string;


//// [typeOrInterfaceIdentifierSatisfiesExpression.js]
var type = 'x';
type;
type;
var interface = 'x';
interface;
interface;
