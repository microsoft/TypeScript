//@module: amd
//@filename: m1.ts

enum foo { A }
module foo {
    const enum E { X }
}

export = foo