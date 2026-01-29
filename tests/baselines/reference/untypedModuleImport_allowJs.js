//// [tests/cases/conformance/moduleResolution/untypedModuleImport_allowJs.ts] ////

//// [index.js]
exports.default = { bar() { return 0; } }

//// [a.ts]
import foo from "foo";
foo.bar();


//// [a.js]
import foo from "foo";
foo.bar();
