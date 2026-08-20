//// [tests/cases/compiler/classExpressionWithComputedPropertyInLoop.ts] ////

//// [classExpressionWithComputedPropertyInLoop.ts]
// Class expression in a loop with a computed property name on an instance field.
// The class temp variable should be block-scoped (let) to ensure each iteration
// gets its own binding, matching the behavior when BlockScopedBindingInLoop is set.

const array: any[] = [];
const key = "myKey";
for (let i = 0; i < 3; i++) {
    array.push(class C {
        [key] = i;
        #field = i;
    });
}


//// [classExpressionWithComputedPropertyInLoop.js]
"use strict";
// Class expression in a loop with a computed property name on an instance field.
// The class temp variable should be block-scoped (let) to ensure each iteration
// gets its own binding, matching the behavior when BlockScopedBindingInLoop is set.
const array = [];
const key = "myKey";
for (let i = 0; i < 3; i++) {
    let _C_field, _a, _b;
    array.push((_b = class C {
            constructor() {
                this[_a] = i;
                _C_field.set(this, i);
            }
        },
        _C_field = new WeakMap(),
        _a = key,
        _b));
}
