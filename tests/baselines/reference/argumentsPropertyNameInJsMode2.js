//// [tests/cases/compiler/argumentsPropertyNameInJsMode2.ts] ////

//// [a.js]
function f(x) {
  arguments;
}

f(1, 2, 3);


//// [a.js]
function f(x) {
    arguments;
}
f(1, 2, 3);


//// [a.d.ts]
declare function f(x: any, ...args: any[]): void;
