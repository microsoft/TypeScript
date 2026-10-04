// @strict: true
// @noemit: true

// This test verifies that the checker doesn't panic when an assertion predicate
// references a parameter name that doesn't match any actual function parameter.
// This specifically tests the code path in isReachableFlowNodeWorker.

function assertCondition(
  _condition: boolean
): asserts condition {  // "condition" doesn't match parameter "_condition"
  if (!_condition) {
    throw new Error('Condition failed');
  }
}

function test(): void {
  assertCondition(false);
  console.log("unreachable");
}
