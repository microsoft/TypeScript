//// [tests/cases/conformance/types/import/importWithTypeArguments.ts] ////

//// [importWithTypeArguments.ts]
import<T>
const a = import<string, number>


//// [importWithTypeArguments.js]
"use strict";
import;
const a = import;
