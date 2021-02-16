//// [tests/cases/conformance/externalModules/topLevelAwait.1.ts] ////

//// [index.ts]
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

// await in decorators
declare const dec: any;
@(await dec)
class C {
}

// await allowed in aliased import
import { await as _await } from "./other";

// newlines
// await in throw
throw await
    1;

// await in var
let y = await
    1;

// await in expression statement;
await
    1;

//// [other.ts]
const _await = 1;

// await allowed in aliased export
export { _await as await };

// for-await-of
const arr = [Promise.resolve()];

for await (const item of arr) {
  item;
}


//// [other.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var e_1, _a, _await, arr;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: async function () {
            _await = 1;
            exports_1("await", _await);
            // for-await-of
            arr = [Promise.resolve()];
            try {
                for (var arr_1 = __asyncValues(arr), arr_1_1; arr_1_1 = await arr_1.next(), !arr_1_1.done;) {
                    const item = arr_1_1.value;
                    item;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) await _a.call(arr_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
});
//// [index.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var x, C1, C2, C3, C, y;
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
            C = class C {
            };
            C = __decorate([
                (await dec)
            ], C);
            // newlines
            // await in throw
            throw await 1;
            // await in var
            y = await 1;
            // await in expression statement;
            await 1;
        }
    };
});
