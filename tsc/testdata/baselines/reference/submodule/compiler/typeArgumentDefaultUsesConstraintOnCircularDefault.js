//// [tests/cases/compiler/typeArgumentDefaultUsesConstraintOnCircularDefault.ts] ////

//// [typeArgumentDefaultUsesConstraintOnCircularDefault.ts]
type Test<T extends string = T> = { value: T };  // Error

let zz: Test = { foo: "abc" };  // should error on comparison with Test<string>

let zzy: Test = { value: {} };

// Simplified repro from #28873

class C1<T extends C1 = any> {}

class C2<T extends C2<any> = any> {}


//// [typeArgumentDefaultUsesConstraintOnCircularDefault.js]
let zz = { foo: "abc" };
let zzy = { value: {} };
class C1 {
}
class C2 {
}
