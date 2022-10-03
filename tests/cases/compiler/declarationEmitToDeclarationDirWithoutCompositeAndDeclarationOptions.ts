// @filename: /foo/tsconfig.json
{
    "compilerOptions": { "declarationDir": "out" }
}

// @filename: /foo/test.ts
interface Foo {
    x: number;
}
export default Foo;
