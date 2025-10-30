//// [tests/cases/compiler/verbatimModuleSyntaxEmptyNamedImport.ts] ////

//// [verbatimModuleSyntaxEmptyNamedImport_module.ts]
export const ValueExport = 0;
export type TypeOnlyExport = number;
const DefaultExport = class {};
export default DefaultExport;

//// [verbatimModuleSyntaxEmptyNamedImport_module.d.ts]
declare module "verbatimModuleSyntaxEmptyNamedImport_module";

//// [verbatimModuleSyntaxEmptyNamedImport_test.ts]
import DefaultExportA, {
  type TypeOnlyExport as TypeOnlyExportA,
} from "verbatimModuleSyntaxEmptyNamedImport_module";
import DefaultExportB, {
  type TypeOnlyExport as TypeOnlyExportB,
  ValueExport as ValueExportB,
} from "verbatimModuleSyntaxEmptyNamedImport_module";
import DefaultExportC, {
  ValueExport as RenamedValueExportC,
} from "verbatimModuleSyntaxEmptyNamedImport_module";
import DefaultExportD from "verbatimModuleSyntaxEmptyNamedImport_module";
import { type TypeOnlyExport as RenamedTypeOnlyExportE } from "verbatimModuleSyntaxEmptyNamedImport_module";
import { ValueExport as RenamedValueExportF } from "verbatimModuleSyntaxEmptyNamedImport_module";
import * as NamespaceImportG from "verbatimModuleSyntaxEmptyNamedImport_module";

new DefaultExportA();
new DefaultExportB();
new DefaultExportC();
new DefaultExportD();
console.log(ValueExportB);
console.log(RenamedValueExportC);
console.log(RenamedValueExportF);
console.log(NamespaceImportG.ValueExport);


//// [verbatimModuleSyntaxEmptyNamedImport_module.js]
export const ValueExport = 0;
const DefaultExport = class {
};
export default DefaultExport;
//// [verbatimModuleSyntaxEmptyNamedImport_test.js]
import DefaultExportA from "verbatimModuleSyntaxEmptyNamedImport_module";
import DefaultExportB, { ValueExport as ValueExportB, } from "verbatimModuleSyntaxEmptyNamedImport_module";
import DefaultExportC, { ValueExport as RenamedValueExportC, } from "verbatimModuleSyntaxEmptyNamedImport_module";
import DefaultExportD from "verbatimModuleSyntaxEmptyNamedImport_module";
import {} from "verbatimModuleSyntaxEmptyNamedImport_module";
import { ValueExport as RenamedValueExportF } from "verbatimModuleSyntaxEmptyNamedImport_module";
import * as NamespaceImportG from "verbatimModuleSyntaxEmptyNamedImport_module";
new DefaultExportA();
new DefaultExportB();
new DefaultExportC();
new DefaultExportD();
console.log(ValueExportB);
console.log(RenamedValueExportC);
console.log(RenamedValueExportF);
console.log(NamespaceImportG.ValueExport);
