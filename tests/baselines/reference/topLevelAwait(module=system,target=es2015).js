//// [topLevelAwait.ts]
export const x = 1;
await x;

await (async () => {})();

//// [topLevelAwait.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var x;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: async function () {
            exports_1("x", x = 1);
            await x;
            await (() => __awaiter(void 0, void 0, void 0, function* () { }))();
        }
    };
});
