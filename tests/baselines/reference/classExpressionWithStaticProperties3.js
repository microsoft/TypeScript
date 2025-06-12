//// [tests/cases/compiler/classExpressionWithStaticProperties3.ts] ////

//// [classExpressionWithStaticProperties3.ts]
declare var console: any;
const arr: {y(): number}[] = [];
for (let i = 0; i < 3; i++) {
    arr.push(class C {
        static x = i;
        static y = () => C.x * 2;
    });
}
arr.forEach(C => console.log(C.y()));

//// [classExpressionWithStaticProperties3.js]
const arr = [];
for (let i = 0; i < 3; i++) {
    let _a;
    arr.push((_a = class C {
        },
        _a.x = i,
        _a.y = () => _a.x * 2,
        _a));
}
arr.forEach(C => console.log(C.y()));
