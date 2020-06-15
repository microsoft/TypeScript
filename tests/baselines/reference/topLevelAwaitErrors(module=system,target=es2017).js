//// [topLevelAwaitErrors.ts]
export const x = 1;

// reparse call as invalid await should error
await (x,);
await <number, string>(x);

// reparse tagged template as invalid await should error
await <number, string> ``;

// reparse variable names and patterns as await should fail
var await = 1;
var {await} = {await:1};
var [await] = [1];

// reparse class extends clause should fail
class C extends await<string> {
}

//// [topLevelAwaitErrors.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var x, await, await, await, C;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: async function () {
            exports_1("x", x = 1);
            // reparse call as invalid await should error
            await (x, );
            await , string > (x);
            // reparse tagged template as invalid await should error
            await , string > ``;
            // reparse variable names and patterns as await should fail
            await = 1;
            await = { await: 1 }.await;
            await = [1][0];
            // reparse class extends clause should fail
            C = class C extends  {
            };
        }
    };
});
