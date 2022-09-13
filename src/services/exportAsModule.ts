import * as ts from "./_namespaces/ts";

// Here we expose the TypeScript services as an external module
// so that it may be consumed easily like a node module.
// @ts-ignore
// /** @internal */ declare const module: { exports: {} };
// if (typeof module !== "undefined" && module.exports) {
//     module.exports = ts;
// }

// If we are bundled with esbuild via IIFE, this is a hacky way to jump out of
// its module system and conditionally export to CJS in the bundle.
//
// We may want to do something different for this.

// eslint-disable-next-line no-eval
// eval("(ts) => { if (typeof module !== 'undefined' && module.exports) module.exports = ts }")(ts);

// TODO(jakebailey): remove; this is just here and ignored for now.
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
ts;
