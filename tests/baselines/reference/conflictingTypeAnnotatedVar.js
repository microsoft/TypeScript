//// [conflictingTypeAnnotatedVar.ts]
var foo: string;
function foo(): number { }
function foo(): number { }

//// [conflictingTypeAnnotatedVar.js]
var foo;
function foo() { }
function foo() { }
