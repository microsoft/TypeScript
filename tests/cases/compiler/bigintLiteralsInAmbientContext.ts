// @target: ES5

// BigInt literals should not error in ambient contexts regardless of target

// In .d.ts files (all ambient)
declare const n1 = 123n;
declare let n2: 456n;
declare function fn(param: 789n): 012n;
declare class C {
    prop: 345n;
    method(x: 678n): 901n;
}

// In ambient module declarations
declare module "test" {
    const n3 = 234n;
    let n4: 567n;
    function fn2(param: 890n): 123n;
    class C2 {
        prop: 456n;
        method(x: 789n): 012n;
    }
}

// In namespace with declare modifier
declare namespace NS {
    const n5 = 345n;
    let n6: 678n;
    function fn3(param: 901n): 234n;
    class C3 {
        prop: 567n;
        method(x: 890n): 123n;
    }
}

// But BigInt literals should still error in regular code with ES5 target
const regularVar = 456n; // should error
let regularLet: 789n = 789n; // should error for literal, not type