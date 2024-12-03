/// <reference path='fourslash.ts'/>


// simple case
//// {
////     class Foo {
////         a!: "a" | "c";
////     }
////     const f/*f1*/ = new Foo();
//// }
// constructor
//// {
////     type FooParam = "a" | "b";
////     class Foo {
////         constructor(public x: string) {
////             this.x = "a";
////         }
////         foo(p: FooParam): void {}
////     }
////     const f/*f2*/ = new Foo("");
//// }
// inheritance
//// {
////     class Bar {
////         a!: string;
////         bar(): void {}
////         baz(param: string): void {}
////     }
////     class Foo extends Bar {
////         b!: boolean;
////         override baz(param: string | number): void {}
////     }
////     const f/*f3*/ = new Foo();
//// }
// type parameters
//// {
////     class Bar<B extends string> {
////         bar(param: B): void {}
////         baz(): this { return this; }
////     }
////     class Foo extends Bar<"foo"> {
////         foo(): this { return this; }
////     }
////     const b/*b1*/ = new Bar();
////     const f/*f4*/ = new Foo();
//// }
// class expression
//// {
////     class Bar<B extends string> {
////         bar(param: B): void {}
////         baz(): this { return this; }
////     }
////     const noname/*n1*/ = new (class extends Bar<"foo"> {
////         foo(): this { return this; }
////     })();
////     const klass = class extends Bar<"foo"> {
////         foo(): this { return this; }
////     };
////     const k/*k1*/ = new klass();
//// }


verify.baselineQuickInfo({
    f1: [0, 1],
    f2: [0, 1, 2],
    f3: [0, 1],
    b1: [0, 1, 2],
    f4: [0, 1],
    n1: [0, 1],
    k1: [0, 1],
});