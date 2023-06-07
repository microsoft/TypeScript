/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
////function foo( ){
////    return 42;
////}
////const a = foo();
////export = a;

verify.codeFixAvailable([
    { description: ts.Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit.message },
    { description: ts.Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit.message }
]);

verify.codeFix({
    description: ts.Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit.message,
    index: 0,
    newFileContent:
`function foo( ){
    return 42;
}
const a: number = foo();
export = a;`,
});
