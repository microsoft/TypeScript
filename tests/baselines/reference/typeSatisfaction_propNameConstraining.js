//// [tests/cases/conformance/expressions/typeSatisfaction/typeSatisfaction_propNameConstraining.ts] ////

//// [typeSatisfaction_propNameConstraining.ts]
type Keys = 'a' | 'b' | 'c' | 'd';

const p = {
    a: 0,
    b: "hello",
    x: 8 // Should error, 'x' isn't in 'Keys'
} satisfies Partial<Record<Keys, unknown>>;

// Should be OK -- retain info that a is number and b is string
let a = p.a.toFixed();
let b = p.b.substring(1);
// Should error even though 'd' is in 'Keys'
let d = p.d;


//// [typeSatisfaction_propNameConstraining.js]
var p = {
    a: 0,
    b: "hello",
    x: 8 // Should error, 'x' isn't in 'Keys'
};
// Should be OK -- retain info that a is number and b is string
var a = p.a.toFixed();
var b = p.b.substring(1);
// Should error even though 'd' is in 'Keys'
var d = p.d;
