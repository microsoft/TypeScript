// @module: es2015
// @target: es6
// @skipLibCheck: true
// @lib: es6
// @filename: foo.ts
export default "./foo";

// @filename: index.ts
async function foo() {
    return await import((await import("./foo")).default);
}