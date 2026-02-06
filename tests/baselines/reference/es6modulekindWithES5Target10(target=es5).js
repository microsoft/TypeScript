//// [tests/cases/conformance/externalModules/es6/es6modulekindWithES5Target10.ts] ////

//// [es6modulekindWithES5Target10.ts]
import i = require("mod"); // Error;


namespace N {
}
export = N; // Error

//// [es6modulekindWithES5Target10.js]
export {};
