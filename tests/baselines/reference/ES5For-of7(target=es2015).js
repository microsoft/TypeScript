//// [tests/cases/conformance/statements/for-ofStatements/ES5For-of7.ts] ////

//// [ES5For-of7.ts]
for (var w of []) {
    var x = w;
}

for (var v of []) {
    var x = [w, v];
}

//// [ES5For-of7.js]
for (var w of []) {
    var x = w;
}
for (var v of []) {
    var x = [w, v];
}
