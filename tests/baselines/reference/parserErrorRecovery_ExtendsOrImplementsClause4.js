//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/ExtendsOrImplementsClauses/parserErrorRecovery_ExtendsOrImplementsClause4.ts] ////

//// [parserErrorRecovery_ExtendsOrImplementsClause4.ts]
class C extends A implements {
}

//// [parserErrorRecovery_ExtendsOrImplementsClause4.js]
"use strict";
class C extends A {
}
