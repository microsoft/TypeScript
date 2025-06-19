//// [tests/cases/compiler/argumentsPropertyNameInJsMode1.ts] ////

//// [a.js]
const foo = {
   f1: (params) => { }
}

function f2(x) {
  foo.f1({ x, arguments: [] });
}

f2(1, 2, 3);


//// [a.js]
const foo = {
    f1: (params) => { }
};
function f2(x) {
    foo.f1({ x, arguments: [] });
}
f2(1, 2, 3);


//// [a.d.ts]
declare const foo: {
    f1: (params: any) => void;
};
declare function f2(x: any): void;
