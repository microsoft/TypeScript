//// [topLevelAwait.ts]
export const x = 1;
await x;

// reparse element access as await
await [x];
await [x, x];

// reparse call as await
declare function f(): number;
await (x);
await (f(), x);
await <number>(x);
await <number>(f(), x);

// reparse tagged template as await
await ``;
await <string> ``;

// member names should be ok
class C1 {
    await() {}
}
class C2 {
    get await() { return 1; }
    set await(value) { }
}
class C3 {
    await = 1;
}
({
    await() {}
});
({
    get await() { return 1 },
    set await(value) { }
});
({
    await: 1
});

// property access name should be ok
C1.prototype.await;

//// [topLevelAwait.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var x, C1, C2, C3;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: async function () {
            exports_1("x", x = 1);
            await x;
            // reparse element access as await
            await [x];
            await [x, x];
            await (x);
            await (f(), x);
            await (x);
            await (f(), x);
            // reparse tagged template as await
            await ``;
            await ``;
            // member names should be ok
            C1 = class C1 {
                await() { }
            };
            C2 = class C2 {
                get await() { return 1; }
                set await(value) { }
            };
            C3 = class C3 {
                constructor() {
                    this.await = 1;
                }
            };
            ({
                await() { }
            });
            ({
                get await() { return 1; },
                set await(value) { }
            });
            ({
                await: 1
            });
            // property access name should be ok
            C1.prototype.await;
        }
    };
});
