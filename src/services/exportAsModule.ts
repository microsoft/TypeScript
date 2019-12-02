// Here we expose the TypeScript services as an external module
// so that it may be consumed easily like a node module.
// @ts-ignore
/* @internal */ declare const module: { exports: {} };
if (typeof module !== "undefined" && module.exports) {
    module.exports = ts;
}