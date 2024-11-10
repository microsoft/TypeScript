// @strict: true
// @target: es2020

"foo".matchAll("bar"); // OK
"foo".matchAll(/foo/g); // OK
"foo".matchAll(Math.random() >= 0.5 ? /foo/g : "bar"); // OK
"foo".matchAll(/foo/); // should error
"foo".matchAll(Math.random() >= 0.5 ? /foo/g : /foo/); // should error
"foo".matchAll(Math.random() >= 0.5 ? "bar" : /foo/); // should error
