// @target: es5,es2015
// @noTypesAndSymbols: true

// https://github.com/microsoft/TypeScript/issues/39205
let trace: any[] = [];
let order = (n: any): any => trace.push(n);

// order(0) should evaluate before order(1) because the first element is undefined
let [{ [order(1)]: x } = order(0)] = [];

// order(0) should not evaluate because the first element is defined
let [{ [order(1)]: y } = order(0)] = [{}];

// order(0) should evaluate first (destructuring of object literal {})
// order(1) should evaluate next (initializer because property is undefined)
// order(2) should evaluate last (evaluate object binding pattern from initializer)
let { [order(0)]: { [order(2)]: z } = order(1), ...w } = {} as any;


// https://github.com/microsoft/TypeScript/issues/39181

// b = a must occur *after* 'a' has been assigned
let [{ ...a }, b = a]: any[] = [{ x: 1 }]
