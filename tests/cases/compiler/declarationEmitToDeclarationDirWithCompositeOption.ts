// @composite: true
// @filename: /foo/tsconfig.json
{
    "compilerOptions": { "composite": true, "declarationDir": "out" }
}

// @filename: /foo/test.ts
interface Foo {
    x: number;
}
export default Foo;
