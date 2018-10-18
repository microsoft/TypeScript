//// [errorElaboration.ts]
// Repro for #5712

interface Ref<T> {
    prop: T;
}
interface Container<T> {
    m1: Container<Ref<T>>;
    m2: T;
}
declare function foo(x: () => Container<Ref<number>>): void;
let a: () => Container<Ref<string>>;
foo(a);

// Repro for #25498

function test(): {[A in "foo"]: A} {
  return {foo: "bar"};
}


//// [errorElaboration.js]
// Repro for #5712
var a;
foo(a);
// Repro for #25498
function test() {
    return { foo: "bar" };
}
