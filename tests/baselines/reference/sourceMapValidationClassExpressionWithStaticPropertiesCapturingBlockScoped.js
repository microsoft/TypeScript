//// [sourceMapValidationClassExpressionWithStaticPropertiesCapturingBlockScoped.ts]
"use strict"
declare var console: any;
const arr: any[] = [];
for (let i = 0; i < 3; i++) {
    arr.push(class C {
        static x = i;
        static y = () => C.x * 2;
    });
}
arr.forEach(C => console.log(C.y()));

//// [sourceMapValidationClassExpressionWithStaticPropertiesCapturingBlockScoped.js]
"use strict";
const arr = [];
for (let i = 0; i < 3; i++) {
    arr.push((() => {
        let _a = class C {
            };
        _a.x = i;
        _a.y = () => C.x * 2;
        return _a;
    })());
}
arr.forEach(C => console.log(C.y()));
//# sourceMappingURL=sourceMapValidationClassExpressionWithStaticPropertiesCapturingBlockScoped.js.map