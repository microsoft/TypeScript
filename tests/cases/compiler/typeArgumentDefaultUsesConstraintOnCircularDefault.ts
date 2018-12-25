type Test<T extends string = T> = { value: T };

let zz: Test = { foo: "abc" };  // should error on comparison with Test<string>

let zzy: Test = { value: {} };  // should error

// Simplified repro from #28873

class C1<T extends C1 = any> {}  // Error, circular constraint

class C2<T extends C2<any> = any> {}
