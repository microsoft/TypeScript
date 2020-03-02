import * as ts from "./ts";
/* @internal */
declare global {
    // Here we expose the TypeScript services as an external module
    // so that it may be consumed easily like a node module.
    // @ts-ignore
    /* @internal */ const module: {
        exports: {};
    };
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = ts;
}
