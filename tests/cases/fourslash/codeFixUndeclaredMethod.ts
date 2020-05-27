/// <reference path='fourslash.ts' />

//// class A {
////     constructor() {
////         this.foo1(1,2,3);
////         // 7 type args
////         this.foo2<1,2,3,4,5,6,7>();
////         // 8 type args
////         this.foo3<1,2,3,4,5,6,7,8>();
////     }
//// }

verify.codeFix({
    description: "Declare method 'foo1'",
    index: 0,
    newFileContent:
`class A {
    constructor() {
        this.foo1(1,2,3);
        // 7 type args
        this.foo2<1,2,3,4,5,6,7>();
        // 8 type args
        this.foo3<1,2,3,4,5,6,7,8>();
    }
    foo1(arg0: number, arg1: number, arg2: number) {
        throw new Error("Method not implemented.");
    }
}`,
    applyChanges: true,
});

verify.codeFix({
    description: "Declare method 'foo2'",
    index: 0,
    newFileContent:
`class A {
    constructor() {
        this.foo1(1,2,3);
        // 7 type args
        this.foo2<1,2,3,4,5,6,7>();
        // 8 type args
        this.foo3<1,2,3,4,5,6,7,8>();
    }
    foo2<T, U, V, W, X, Y, Z>() {
        throw new Error("Method not implemented.");
    }
    foo1(arg0: number, arg1: number, arg2: number) {
        throw new Error("Method not implemented.");
    }
}`,
    applyChanges: true,
});

verify.codeFix({
    description: "Declare method 'foo3'",
    index: 0,
    newFileContent:
`class A {
    constructor() {
        this.foo1(1,2,3);
        // 7 type args
        this.foo2<1,2,3,4,5,6,7>();
        // 8 type args
        this.foo3<1,2,3,4,5,6,7,8>();
    }
    foo3<T0, T1, T2, T3, T4, T5, T6, T7>() {
        throw new Error("Method not implemented.");
    }
    foo2<T, U, V, W, X, Y, Z>() {
        throw new Error("Method not implemented.");
    }
    foo1(arg0: number, arg1: number, arg2: number) {
        throw new Error("Method not implemented.");
    }
}`
});
