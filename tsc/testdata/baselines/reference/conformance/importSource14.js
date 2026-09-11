//// [tests/cases/conformance/importSource/importSource14.ts] ////

//// [a.d.txt.ts]
export {};

//// [b.ts]
import source a from "./a.txt";
const b = import.source("./a.txt");

a;
b;


//// [b.js]
import source a from "./a.txt";
const b = import.source("./a.txt");
a;
b;
