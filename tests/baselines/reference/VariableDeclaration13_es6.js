//// [tests/cases/conformance/es6/variableDeclarations/VariableDeclaration13_es6.ts] ////

//// [VariableDeclaration13_es6.ts]
// An ExpressionStatement cannot start with the two token sequence `let [` because
// that would make it ambiguous with a `let` LexicalDeclaration whose first LexicalBinding was an ArrayBindingPattern.
var let: any;
let[0] = 100;

//// [VariableDeclaration13_es6.js]
// An ExpressionStatement cannot start with the two token sequence `let [` because
// that would make it ambiguous with a `let` LexicalDeclaration whose first LexicalBinding was an ArrayBindingPattern.
var let;
let [];
0;
100;
