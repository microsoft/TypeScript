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