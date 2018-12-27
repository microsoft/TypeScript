//// [spreadUnionType.ts]
function foo1(a: number[] | string[]): number[] | string[]  {
    const z = [...a]
    return z
}

function bar1(a: (number | string)[]): (number | string)[]  {
    const z = [...a]
    return z
}

function baz1(a: number[] | string[], b: number[] | boolean[]): (number | string | boolean)[]  {
    const z = [...a, ...b]
    return z
}

function baz2(a: (number | string)[], b: (number | boolean)[]): (number | string | boolean)[]  {
    const z = [...a, ...b]
    return z
}

function baz3(a: [number, string]): [number, string]  {
    const z = [...a]
    return z
}

function baz4(a: [number, string], b: (number | boolean)[]): (number | string | boolean)[]  {
    const z = [...a, ...b]
    return z
}


//// [spreadUnionType.js]
function foo1(a) {
    var z = a.slice();
    return z;
}
function bar1(a) {
    var z = a.slice();
    return z;
}
function baz1(a, b) {
    var z = a.concat(b);
    return z;
}
function baz2(a, b) {
    var z = a.concat(b);
    return z;
}
function baz3(a) {
    var z = a.slice();
    return z;
}
function baz4(a, b) {
    var z = a.concat(b);
    return z;
}
