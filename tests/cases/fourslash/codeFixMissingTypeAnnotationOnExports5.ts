/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
////const a = 42;
////const b = 42;
////export class C {
////  get property() { return a + b; }
////}

verify.codeFixAvailable([
    { description: ts.Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit.message },
    { description: ts.Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit.message }
]);

verify.codeFix({
    description: ts.Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit.message,
    index: 0,
    newFileContent:
`const a = 42;
const b = 42;
export class C {
  get property(): number { return a + b; }
}`,
});
