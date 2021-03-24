//// [privateNameClassExpressionLoop.ts]
const array = [];
for (let i = 0; i < 10; ++i) {
    array.push(class C {
        #myField = "hello";
    });
}


//// [privateNameClassExpressionLoop.js]
var _a;
const array = [];
for (let i = 0; i < 10; ++i) {
    let _myField;
    array.push((_a = class C {
            constructor() {
                _myField.set(this, "hello");
            }
        },
        _myField = new WeakMap(),
        _a));
}
