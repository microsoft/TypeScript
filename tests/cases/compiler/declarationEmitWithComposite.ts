// @composite: true
// @fullEmitPaths: true

// @filename: /foo/tsconfig.json
{
    "compilerOptions": { "composite": true, "outDir": "out" }
}

// @filename: /foo/test.ts
interface Foo {
    x: number;
}
export default Foo;
