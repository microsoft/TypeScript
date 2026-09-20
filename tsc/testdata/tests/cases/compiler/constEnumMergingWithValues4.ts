// @target: es2015
//@module: commonjs
//@filename: m1.ts

namespace foo {
    const enum E { X }
}

namespace foo {
    var x = 1;
}


export = foo