// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/62279

export function assertCondition<T>(condition: T): asserts condition {
  if (!condition) {
    throw new Error();
  }
}

type ValidType = "A" | "B";

declare const status: ValidType;

function test1() {
  assertCondition(status !== "B");
  const status2 = status;
  assertCondition(status2 === "A");
}

function test2() {
  assertCondition(status !== "B");
  for (const _ of [1, 2]) {
    const status2 = status;
    assertCondition(status2 === "A");
  }
}
