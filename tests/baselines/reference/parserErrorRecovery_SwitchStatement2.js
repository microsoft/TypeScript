//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/SwitchStatements/parserErrorRecovery_SwitchStatement2.ts] ////

//// [parserErrorRecovery_SwitchStatement2.ts]
class C {
  constructor() {
    switch (e) {

class D {
}

//// [parserErrorRecovery_SwitchStatement2.js]
class C {
    constructor() {
        switch (e) {
        }
        class D {
        }
    }
}
