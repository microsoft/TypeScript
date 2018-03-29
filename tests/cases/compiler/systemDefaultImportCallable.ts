// @module: system
// @filename: core-js.d.ts
declare module core {
    var String: {
        repeat(text: string, count: number): string;
    };
}
declare module "core-js/fn/string/repeat" {
    var repeat: typeof core.String.repeat;
    export default repeat;
}
// @filename: greeter.ts
import repeat from "core-js/fn/string/repeat";

const _: string = repeat(new Date().toUTCString() + " ", 2);