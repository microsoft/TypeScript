// @module: commonjs
// @target: esnext
// @filename: 0.ts
export function foo() { return "foo"; }

// @filename: 1.ts
export function backup() { return "backup"; }

// @filename: 2.ts
async function compute(promise: Promise<any>) {
    let j = await promise;
    if (!j) {
        j = await import("./1");
        return j.backup();
    }
    return j.foo();
}

compute(import("./0"));