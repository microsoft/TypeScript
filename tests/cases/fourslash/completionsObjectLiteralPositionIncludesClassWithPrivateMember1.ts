/// <reference path="fourslash.ts" />

// @strict: true

//// type ExampleInit = {
////   foo: number;
//// };
////
//// type ExampleLike = Example | ExampleInit;
////
//// class Example {
////   static isExample(value: any): value is Example {
////     return #foo in value;
////   }
////
////   static from(exampleLike: ExampleLike): Example {
////     if (Example.isExample(exampleLike)) {
////       return exampleLike;
////     }
////     return new Example(exampleLike);
////   }
////
////   readonly #foo: number;
////
////   constructor({ foo }: ExampleInit) {
////     this.#foo = foo;
////   }
//// }
////
//// const example = Example.from({
////   /*1*/
//// });

verify.completions({
    marker: "1",
    exact: ["foo"]
})
