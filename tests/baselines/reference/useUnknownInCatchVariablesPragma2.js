//// [tests/cases/conformance/pragma/useUnknownInCatchVariables/useUnknownInCatchVariablesPragma2.ts] ////

//// [file1.ts]
// @ts-useUnknownInCatchVariables
try {

}
catch (thing) {
    thing.a;
}

//// [file2.ts]
// @ts-useUnknownInCatchVariables true
try {

}
catch (thing) {
    thing.a;
}

//// [file3.ts]
// @ts-useUnknownInCatchVariables false
try {

}
catch (thing) {
    thing.a;
}

//// [file4.ts]
try {

}
catch (thing) {
    thing.a;
}


//// [file1.js]
// @ts-useUnknownInCatchVariables
try {
}
catch (thing) {
    thing.a;
}
//// [file2.js]
// @ts-useUnknownInCatchVariables true
try {
}
catch (thing) {
    thing.a;
}
//// [file3.js]
// @ts-useUnknownInCatchVariables false
try {
}
catch (thing) {
    thing.a;
}
//// [file4.js]
try {
}
catch (thing) {
    thing.a;
}
