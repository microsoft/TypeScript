// @module: umd
// @target: esnext
// @filename: something.ts
export = 42;

// @filename: index.ts
export = async function() {
    const something = await import("./something");
};