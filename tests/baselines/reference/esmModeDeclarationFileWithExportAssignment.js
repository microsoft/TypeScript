//// [tests/cases/compiler/esmModeDeclarationFileWithExportAssignment.ts] ////

//// [other.d.mts]
declare function example(): 5;
export = example;

//// [main.mts]
import example from "./other.mjs";
example();

//// [main.mjs]
import example from "./other.mjs";
example();
