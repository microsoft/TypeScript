// @declaration: true
// @filename: /foo/tsconfig.json
{
    "compilerOptions": { "declaration": true, "declarationDir": "out" }
}

// @filename: /foo/test.ts
interface Foo {
    x: number;
}
export default Foo;
