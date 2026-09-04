//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames52.ts] ////

//// [computedPropertyNames52.js]
const array = [];
for (let i = 0; i < 10; ++i) {
    array.push(class C {
        [i] = () => C;
        static [i] = 100;
    })
}


//// [computedPropertyNames52.js]
"use strict";
const array = [];
for (let i = 0; i < 10; ++i) {
    let _a, _b, _c;
    array.push((_c = class C {
            constructor() {
                this[_a] = () => _c;
            }
        },
        _a = i,
        _b = i,
        _c[_b] = 100,
        _c));
}
