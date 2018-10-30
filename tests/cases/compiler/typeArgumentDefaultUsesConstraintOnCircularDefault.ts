type Test<T extends string = T> = { value: T };

let zz: Test = { foo: "abc" };  // should error on comparison with Test<string>

let zzy: Test = { value: {} };  // should error
