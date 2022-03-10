//// [narrowingAssignmentReadonlyRespectsAssertion.ts]
// https://github.com/microsoft/TypeScript/issues/41984

interface TestCase<T extends string | number> {
  readonly val1: T | ReadonlyArray<T>;
  readonly val2: ReadonlyArray<T>;
}

interface MultiCaseFixture<T> {
  cases: T[];
}

function subDataFunc(): TestCase<string | number>[] {
  return [
      { val1: "a", val2: ["a", "b", "c"] },
      { val1: 2, val2: [1, 2, 3] },
      { val1: ["a", "z"], val2: ["x", "y", "z"] },
      { val1: [5, 10], val2: [10, 100, 1000] },
  ];
}

function dataFunc<T>(subFunc: () => T[]): MultiCaseFixture<T> {
  return { cases: subFunc() };
}

function testFunc() {
  const fixture = dataFunc<TestCase<string | number>>(subDataFunc);
  fixture.cases.forEach(({ val1, val2 }) => {
      if (Array.isArray(val1)) {
          // This should retain val1 as being an array
          const reversedVal1 = val1.slice().reverse();
          console.log(reversedVal1);
      } else {
          console.log(val1);
      }
      console.log(val2);
  });
}

testFunc();


//// [narrowingAssignmentReadonlyRespectsAssertion.js]
// https://github.com/microsoft/TypeScript/issues/41984
function subDataFunc() {
    return [
        { val1: "a", val2: ["a", "b", "c"] },
        { val1: 2, val2: [1, 2, 3] },
        { val1: ["a", "z"], val2: ["x", "y", "z"] },
        { val1: [5, 10], val2: [10, 100, 1000] },
    ];
}
function dataFunc(subFunc) {
    return { cases: subFunc() };
}
function testFunc() {
    var fixture = dataFunc(subDataFunc);
    fixture.cases.forEach(function (_a) {
        var val1 = _a.val1, val2 = _a.val2;
        if (Array.isArray(val1)) {
            // This should retain val1 as being an array
            var reversedVal1 = val1.slice().reverse();
            console.log(reversedVal1);
        }
        else {
            console.log(val1);
        }
        console.log(val2);
    });
}
testFunc();
