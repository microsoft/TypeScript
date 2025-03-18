//// [tests/cases/conformance/es7/trailingCommasInFunctionParametersAndArguments.ts] ////

//// [trailingCommasInFunctionParametersAndArguments.ts]
function f1(x,) {}

f1(1,);

function f2(...args,) {}

// Allowed for ambient declarations
declare function f25(...args,): void;

f2(...[],);

// Not confused by overloads
declare function f3(x, ): number;
declare function f3(x, y,): string;

<number>f3(1,);
<string>f3(1, 2,);

// Works for constructors too
class X {
    constructor(a,) { }
    // See trailingCommasInGetter.ts
    set x(value,) { }
}
interface Y {
    new(x,);
    (x,);
}

new X(1,);


//// [trailingCommasInFunctionParametersAndArguments.js]
function f1(x) { }
f1(1);
function f2(...args) { }
f2(...[]);
f3(1);
f3(1, 2);
class X {
    constructor(a) { }
    set x(value) { }
}
new X(1);
