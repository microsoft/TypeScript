//// [tests/cases/conformance/es2020/stringMatchAllES2020.ts] ////

//// [stringMatchAllES2020.ts]
"foo".matchAll("bar"); // OK
"foo".matchAll(/foo/g); // OK
"foo".matchAll(Math.random() >= 0.5 ? /foo/g : "bar"); // OK
"foo".matchAll(/foo/); // should error
"foo".matchAll(Math.random() >= 0.5 ? /foo/g : /foo/); // should error
"foo".matchAll(Math.random() >= 0.5 ? "bar" : /foo/); // should error


//// [stringMatchAllES2020.js]
"use strict";
"foo".matchAll("bar"); // OK
"foo".matchAll(/foo/g); // OK
"foo".matchAll(Math.random() >= 0.5 ? /foo/g : "bar"); // OK
"foo".matchAll(/foo/); // should error
"foo".matchAll(Math.random() >= 0.5 ? /foo/g : /foo/); // should error
"foo".matchAll(Math.random() >= 0.5 ? "bar" : /foo/); // should error
