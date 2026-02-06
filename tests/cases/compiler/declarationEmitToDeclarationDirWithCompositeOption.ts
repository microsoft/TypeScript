// @module: commonjs
// @target: es2015
// @composite: true
// @filename: /foo/tsconfig.json
{
    "compilerOptions": { "composite": true, "declarationDir": "out", "module": "commonjs", "target": "es2015" }
}

// @filename: /foo/test.ts
interface Foo {
    x: number;
}
export default Foo;
