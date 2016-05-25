//// [classExpressionWithStaticProperties4_ES6.ts]
declare var console: any;
const arr: any[] = [];
for (let i = 0; i < 3; i++) {
    arr.push((class C {
        static x = i;
        static y = () => C.x * 2;
    }), i);
}
arr.forEach(C => console.log(C.y()));

//// [classExpressionWithStaticProperties4_ES6.js]
const arr = [];
for (let i = 0; i < 3; i++) {
    arr.push(((() => {
        let _a = class C {
            };
        _a.x = i;
        _a.y = () => C.x * 2;
        return _a;
    })()), i);
}
arr.forEach(C => console.log(C.y()));
