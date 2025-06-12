//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/ExtendsOrImplementsClauses/parserErrorRecovery_ExtendsOrImplementsClause5.ts] ////

//// [parserErrorRecovery_ExtendsOrImplementsClause5.ts]
class C extends A, implements B, {
}

//// [parserErrorRecovery_ExtendsOrImplementsClause5.js]
class C extends A {
}
