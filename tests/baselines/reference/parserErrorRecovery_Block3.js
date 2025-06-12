//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/Blocks/parserErrorRecovery_Block3.ts] ////

//// [parserErrorRecovery_Block3.ts]
class C  {
    private a(): boolean {

    private b(): boolean {
    }
}

//// [parserErrorRecovery_Block3.js]
class C {
    a() {
    }
    b() {
    }
}
