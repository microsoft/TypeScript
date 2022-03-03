//// [computedPropertyNames52.js]
const array = [];
for (let i = 0; i < 10; ++i) {
    array.push(class C {
        [i] = () => C;
        static [i] = 100;
    })
}


//// [computedPropertyNames52-emit.js]
var _a;
const array = [];
for (let i = 0; i < 10; ++i) {
    let _b, _c;
    array.push((_c = class C {
            constructor() {
                this[_b] = () => C;
            }
        },
        _b = i,
        _a = i,
        _c[_a] = 100,
        _c));
}
