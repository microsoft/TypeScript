// @module: commonjs
// @declaration: true

// @Filename: declFileAliasUseBeforeDeclaration_foo.ts
export class Foo { }

// @Filename: declFileAliasUseBeforeDeclaration_test.ts
export function bar(a: foo.Foo) { }
import foo = require("./declFileAliasUseBeforeDeclaration_foo");