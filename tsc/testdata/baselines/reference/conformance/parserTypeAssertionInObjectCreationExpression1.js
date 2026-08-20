//// [tests/cases/conformance/parser/ecmascript5/Expressions/parserTypeAssertionInObjectCreationExpression1.ts] ////

//// [parserTypeAssertionInObjectCreationExpression1.ts]
new <T>Foo()

//// [parserTypeAssertionInObjectCreationExpression1.js]
"use strict";
new  < T > Foo();
