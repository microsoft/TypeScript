//// [tests/cases/conformance/importDefer/dynamicImportDeferInvalidStandalone.ts] ////

//// [b.ts]
import.defer;

(import.defer)("a");

Function(import.defer);

import.defer

//// [b.js]
import.defer;
(import.defer)("a");
Function(import.defer);
import.defer;
