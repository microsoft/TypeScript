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
var foo = {
    f1: function (params) { }
};
function f2(x) {
    foo.f1({ x: x, arguments: [] });
}
f2(1, 2, 3);


//// [a.d.ts]
declare function f2(x: any): void;
declare namespace foo {
    function f1(params: any): void;
}
