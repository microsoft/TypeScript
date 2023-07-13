//// [tests/cases/conformance/statements/continueStatements/invalidSwitchContinueStatement.ts] ////

//// [invalidSwitchContinueStatement.ts]
// continue is not allowed in a switch statement

switch (12) {
    case 5:
        continue;
}


//// [invalidSwitchContinueStatement.js]
// continue is not allowed in a switch statement
switch (12) {
    case 5:
        continue;
}
