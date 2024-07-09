// @declaration: true
// @types: dep
// @typeRoots: /deps
// @currentDirectory: /
// @noImplicitReferences: true
// @filename: /deps/dep/dep.d.ts
declare namespace NS {
    interface Dep {
    }
}
// @filename: /deps/dep/package.json
{
    "typings": "dep.d.ts"
}
// @filename: /src/index.ts
class Src implements NS.Dep { }
