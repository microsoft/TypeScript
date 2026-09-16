// @target: es2015
//@module: commonjs
//@filename: m1.ts

function foo() {}
namespace foo {
    const enum E { X }
}

export = foo