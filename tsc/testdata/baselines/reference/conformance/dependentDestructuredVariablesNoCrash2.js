//// [tests/cases/conformance/controlFlow/dependentDestructuredVariablesNoCrash2.ts] ////

//// [dependentDestructuredVariablesNoCrash2.ts]
// https://github.com/microsoft/TypeScript/issues/63091

function ([undefined, unknown]: string | undefined = undefined)


//// [dependentDestructuredVariablesNoCrash2.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/63091


//// [dependentDestructuredVariablesNoCrash2.d.ts]
declare function ([undefined, unknown]?: string | undefined): any;
