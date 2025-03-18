//// [tests/cases/compiler/controlFlowManyCallExpressionStatementsPerf.ts] ////

//// [controlFlowManyCallExpressionStatementsPerf.ts]
function test(x: boolean): boolean { return x; }

let state = true;

if (state) {
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
  test(state as any && state);
}


//// [controlFlowManyCallExpressionStatementsPerf.js]
function test(x) { return x; }
let state = true;
if (state) {
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
    test(state && state);
}
