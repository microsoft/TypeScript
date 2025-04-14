/// <reference path="fourslash.ts" />

// @isolatedModules: true
// @module: es2015
// @experimentalDecorators: true
// @emitDecoratorMetadata: true

// @Filename: /mod.ts
//// export default interface I1 {}
//// export interface I2 {}
//// export class C1 {}

// @Filename: /index.ts
//// import I1, { I2 } from "./mod";
////
//// declare var EventListener: any;
//// export class HelloWorld {
////   @EventListener("1")
////   p1!: I1;
////   p2!: I2;
//// }

// @Filename: /index2.ts
//// import { C1, I2 } from "./mod";
////
//// declare var EventListener: any;
//// export class HelloWorld {
////   @EventListener("1")
////   p1!: I2;
////   p2!: C1;
//// }

const diag = ts.Diagnostics.A_type_referenced_in_a_decorated_signature_must_be_imported_with_import_type_or_a_namespace_import_when_isolatedModules_and_emitDecoratorMetadata_are_enabled;

goTo.file("/index.ts");
verify.not.codeFixAvailable();

// Mostly verifying that the type-only fix is not available
// (if both were available you'd have to specify `index`
// in `verify.codeFix`).
goTo.file("/index2.ts");
verify.codeFix({
  description: ts.Diagnostics.Convert_named_imports_to_namespace_import.message,
  errorCode: diag.code,
  applyChanges: false,
  newFileContent: `import * as mod from "./mod";

declare var EventListener: any;
export class HelloWorld {
  @EventListener("1")
  p1!: mod.I2;
  p2!: mod.C1;
}`,
});

