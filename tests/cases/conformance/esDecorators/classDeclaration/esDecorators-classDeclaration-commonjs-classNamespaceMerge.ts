// @target: es2022
// @module: commonjs

declare var deco: any;

@deco
export class Example {
    static foo() {}
}

export namespace Example {
    export const x = 1;
}

Example.foo();