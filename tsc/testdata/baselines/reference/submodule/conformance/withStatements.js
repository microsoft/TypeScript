//// [tests/cases/conformance/statements/withStatements/withStatements.ts] ////

//// [withStatements.ts]
var x = 12;
with (x) {
    name = 'twelve'
    id = 12
}

//// [withStatements.js]
var x = 12;
with (x) {
    name = 'twelve';
    id = 12;
}
