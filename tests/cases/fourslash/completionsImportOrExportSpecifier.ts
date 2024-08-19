///<reference path="fourslash.ts" />

// @Filename: exports.ts
//// export let foo = 1;
//// let someValue = 2;
//// let someType = 3;
//// export {
////   someValue as "__some value",
////   someType as "__some type",
//// };

// @Filename: values.ts
//// import { /*valueImport0*/ } from "./exports";
//// import { /*valueImport1*/ as valueImport1 } from "./exports";
//// import { foo as /*valueImport2*/ } from "./exports";
//// import { foo, /*valueImport3*/ as valueImport3 } from "./exports";
////
//// export { /*valueExport0*/ } from "./exports";
//// export { /*valueExport1*/ as valueExport1 } from "./exports";
//// export { foo as /*valueExport2*/ } from "./exports";
//// export { foo, /*valueExport3*/ } from "./exports";

// @Filename: types.ts
//// import { type /*typeImport0*/ } from "./exports";
//// import { type /*typeImport1*/ as typeImport1 } from "./exports";
//// import { type foo as /*typeImport2*/ } from "./exports";
//// import { type foo, type /*typeImport3*/ as typeImport3 } from "./exports";
////
//// export { type /*typeExport0*/ } from "./exports";
//// export { type /*typeExport1*/ as typeExport1 } from "./exports";
//// export { type foo as /*typeExport2*/ } from "./exports";
//// export { type foo, type /*typeExport3*/ } from "./exports";

const __some_type = { name: "__some type", insertText: '"__some type"' }
const __some_value = { name: "__some value", insertText: '"__some value"' }
const __some_type_as = { name: "__some type", insertText: '"__some type" as __some_type' }
const __some_value_as = { name: "__some value", insertText: '"__some value" as __some_value' }
const typeKeyword = { name: "type", sortText: completion.SortText.GlobalsOrKeywords }

verify.completions({ marker: "valueImport0", exact: [__some_type_as, __some_value_as, "foo", typeKeyword] });
verify.completions({ marker: "valueImport1", exact: [__some_type_as, __some_value_as, "foo", typeKeyword] });
verify.completions({ marker: "valueImport2", exact: [] });
verify.completions({ marker: "valueImport3", exact: [__some_type_as, __some_value_as, typeKeyword] });

verify.completions({ marker: "valueExport0", exact: [__some_type, __some_value, "foo", typeKeyword] });
verify.completions({ marker: "valueExport1", exact: [__some_type, __some_value, "foo", typeKeyword] });
verify.completions({ marker: "valueExport2", exact: [] });
verify.completions({ marker: "valueExport3", exact: [__some_type, __some_value, typeKeyword] });

verify.completions({ marker: "typeImport0", exact: [__some_type_as, __some_value_as, "foo"] });
verify.completions({ marker: "typeImport1", exact: [__some_type_as, __some_value_as, "foo"] });
verify.completions({ marker: "typeImport2", exact: [] });
verify.completions({ marker: "typeImport3", exact: [__some_type_as, __some_value_as] });

verify.completions({ marker: "typeExport0", exact: [] });
verify.completions({ marker: "typeExport1", exact: [__some_type, __some_value, "foo"] });
verify.completions({ marker: "typeExport2", exact: [] });
verify.completions({ marker: "typeExport3", exact: [] });
