//// [tests/cases/conformance/externalModules/esnext/esnextmodulekindWithES5Target10.ts] ////

//// [esnextmodulekindWithES5Target10.ts]
import i = require("mod"); // Error;


namespace N {
}
export = N; // Error

//// [esnextmodulekindWithES5Target10.js]
export {};
