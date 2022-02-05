//// [intersectionReductionInFunctionReturnType.ts]
// repro from #46032

interface A {
  p: "a";
}

interface B {
  p: "b";
}

type C = A & B;

function func(): { value: C[] } {
  return {
    value: [],
  };
}

// other tests
// Using `C` in place of `never` shouldn't change the errors other than elaboration

function f1(): never {
  return;
}

function f2(): C {
  return;
}

function g1(): never {}

function g2(): C {}


//// [intersectionReductionInFunctionReturnType.js]
// repro from #46032
function func() {
    return {
        value: []
    };
}
// other tests
// Using `C` in place of `never` shouldn't change the errors other than elaboration
function f1() {
    return;
}
function f2() {
    return;
}
function g1() { }
function g2() { }
