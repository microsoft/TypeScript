//// [tests/cases/compiler/classExpressions.ts] ////

//// [classExpressions.ts]
interface A {}
let x = class B implements A {
    prop: number;
    onStart(): void {
    }
    func = () => {
    }
};

//// [classExpressions.js]
"use strict";
let x = class B {
    prop;
    onStart() {
    }
    func = () => {
    };
};
