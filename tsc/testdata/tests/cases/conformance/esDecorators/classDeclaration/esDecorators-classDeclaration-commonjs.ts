// @target: es2022
// @module: commonjs

declare var deco: any;

@deco
export class Example {
    static foo() {}
}

Example.foo();