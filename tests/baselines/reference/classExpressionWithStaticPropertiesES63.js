//// [classExpressionWithStaticPropertiesES63.ts]

declare var console: any;
const arr: {y(): number}[] = [];
for (let i = 0; i < 3; i++) {
    arr.push(class C {
        static x = i;
        static y = () => C.x * 2;
    });
}
arr.forEach(C => console.log(C.y()));

//// [classExpressionWithStaticPropertiesES63.js]
const arr = [];
for (let i = 0; i < 3; i++) {
    arr.push((C_1 = class C {
        },
        C_1.x = i,
        C_1.y = () => C_1.x * 2,
        C_1));
}
arr.forEach(C => console.log(C.y()));
var C_1;
