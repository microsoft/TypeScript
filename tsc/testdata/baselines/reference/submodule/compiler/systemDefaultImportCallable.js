//// [tests/cases/compiler/systemDefaultImportCallable.ts] ////

//// [core-js.d.ts]
declare module core {
    var String: {
        repeat(text: string, count: number): string;
    };
}
declare module "core-js/fn/string/repeat" {
    var repeat: typeof core.String.repeat;
    export default repeat;
}
//// [greeter.ts]
import repeat from "core-js/fn/string/repeat";

const _: string = repeat(new Date().toUTCString() + " ", 2);

//// [greeter.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repeat_1 = require("core-js/fn/string/repeat");
const _ = (0, repeat_1.default)(new Date().toUTCString() + " ", 2);
