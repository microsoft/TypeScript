// @module: umd
// @target: es2015
// @filename: 0.ts
export function foo() { return "foo"; }

// @filename: 1.ts

// https://github.com/microsoft/TypeScript/issues/36780
async function func() {
    const packageName = '.';
    const packageJson = await import(packageName + '/package.json');
}
