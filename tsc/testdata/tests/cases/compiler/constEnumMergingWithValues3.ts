// @target: es2015
//@module: amd
//@filename: m1.ts

enum foo { A }
namespace foo {
    const enum E { X }
}

export = foo