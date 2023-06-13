//// [tests/cases/conformance/es6/Symbols/symbolType13.ts] ////

//// [symbolType13.ts]
var s = Symbol();
var x: any;

for (s in {}) { }
for (x in s) { }
for (var y in s) { }

//// [symbolType13.js]
var s = Symbol();
var x;
for (s in {}) { }
for (x in s) { }
for (var y in s) { }
