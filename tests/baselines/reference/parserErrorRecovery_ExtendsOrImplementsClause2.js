//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/ExtendsOrImplementsClauses/parserErrorRecovery_ExtendsOrImplementsClause2.ts] ////

//// [parserErrorRecovery_ExtendsOrImplementsClause2.ts]
class C extends A, {
}

//// [parserErrorRecovery_ExtendsOrImplementsClause2.js]
class C extends A {
}
