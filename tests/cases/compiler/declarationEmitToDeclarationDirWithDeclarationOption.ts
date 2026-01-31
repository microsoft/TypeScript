// @module: commonjs
// @target: es2015
// @declaration: true
// @filename: /foo/tsconfig.json
{
    "compilerOptions": { "declaration": true, "declarationDir": "out", "module": "commonjs", "target": "es2015" }
}

// @filename: /foo/test.ts
interface Foo {
    x: number;
}
export default Foo;
