//// [tests/cases/conformance/classes/classExpressions/classExpressionLoop.ts] ////

//// [classExpressionLoop.ts]
let arr = [];
for (let i = 0; i < 10; ++i) {
    arr.push(class C {
        prop = i;
    });
}


//// [classExpressionLoop.js]
let arr = [];
for (let i = 0; i < 10; ++i) {
    arr.push(class C {
        prop = i;
    });
}
