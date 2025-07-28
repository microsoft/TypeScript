//// [tests/cases/compiler/destructuringAssignmentWithConstraints.ts] ////

//// [destructuringAssignmentWithConstraints.ts]
// Test case for destructuring assignment with generic constraints issue

type DataType = 'a' | 'b';

declare function foo<T extends { dataType: DataType }>(template: T): [T, any, any];
declare function bar<T extends { dataType: DataType }>(template: T): [T, any];

function testDestructuringBug() {
  // These work fine (and should continue to work)
  const [, ,] = foo({ dataType: 'a', day: 0 });
  const [x, y, z] = foo({ dataType: 'a', day: 0 });
  const [,] = bar({ dataType: 'a', day: 0 });
  const [a, b] = bar({ dataType: 'a', day: 0 });
  
  // These should work but currently don't (this is the bug)
  const [, , t] = foo({ dataType: 'a', day: 0 }); // Should not error
  const [, u] = bar({ dataType: 'a', day: 0 });   // Should not error
  
  console.log(x, y, z, t, a, b, u);
}

// Test that direct calls work fine (they do)
function testDirectCalls() {
  const result1 = foo({ dataType: 'a', day: 0 });
  const result2 = bar({ dataType: 'a', day: 0 });
  console.log(result1, result2);
}

//// [destructuringAssignmentWithConstraints.js]
// Test case for destructuring assignment with generic constraints issue
function testDestructuringBug() {
    // These work fine (and should continue to work)
    var _a = foo({ dataType: 'a', day: 0 });
    var _b = foo({ dataType: 'a', day: 0 }), x = _b[0], y = _b[1], z = _b[2];
    var _c = bar({ dataType: 'a', day: 0 });
    var _d = bar({ dataType: 'a', day: 0 }), a = _d[0], b = _d[1];
    // These should work but currently don't (this is the bug)
    var _e = foo({ dataType: 'a', day: 0 }), t = _e[2]; // Should not error
    var _f = bar({ dataType: 'a', day: 0 }), u = _f[1]; // Should not error
    console.log(x, y, z, t, a, b, u);
}
// Test that direct calls work fine (they do)
function testDirectCalls() {
    var result1 = foo({ dataType: 'a', day: 0 });
    var result2 = bar({ dataType: 'a', day: 0 });
    console.log(result1, result2);
}
