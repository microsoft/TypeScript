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
    arr.push(class C {
        static x = i;
        static y = () => C.x * 2;
    });
}
arr.forEach(C => console.log(C.y()));
