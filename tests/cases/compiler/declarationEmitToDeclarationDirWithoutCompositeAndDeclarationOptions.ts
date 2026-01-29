// @module: commonjs
// @target: es2015
// @filename: /foo/tsconfig.json
{
    "compilerOptions": { "declarationDir": "out", "module": "commonjs", "target": "es2015" }
}

// @filename: /foo/test.ts
interface Foo {
    x: number;
}
export default Foo;
