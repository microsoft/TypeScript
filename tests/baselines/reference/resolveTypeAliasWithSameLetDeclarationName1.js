//// [tests/cases/compiler/resolveTypeAliasWithSameLetDeclarationName1.ts] ////

//// [resolveTypeAliasWithSameLetDeclarationName1.ts]
class C { }
type baz = C;
let baz: baz;


//// [resolveTypeAliasWithSameLetDeclarationName1.js]
class C {
}
let baz;
