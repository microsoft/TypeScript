//// [tests/cases/compiler/reverseMappedTypeRecursiveInference.ts] ////

//// [reverseMappedTypeRecursiveInference.ts]
type Foo<V> = {
    [K in keyof V]: Foo<V[K]>;
}

type Bar<V> = {
    [K in keyof V]: V[K] extends object ? Bar<V[K]> : string;
}

function test<V>(value: Foo<V>): V {
  console.log(value);
  return undefined as any;
}

const bar: Bar<any> = {};

test(bar);

//// [reverseMappedTypeRecursiveInference.js]
"use strict";
function test(value) {
    console.log(value);
    return undefined;
}
var bar = {};
test(bar);
