/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
////const a = 42;
////const b = 42;
////export class C {
////    //making sure comments are not changed
////  property =a+b; // comment should stay here
////}

verify.codeFixAvailable([
    { description: ts.Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit.message },
]);

verify.codeFix({
    description: ts.Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit.message,
    index: 0,
    newFileContent:
`const a = 42;
const b = 42;
export class C {
    //making sure comments are not changed
  property: number =a+b; // comment should stay here
}`,
});
