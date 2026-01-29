//// [tests/cases/conformance/salsa/reExportJsFromTs.ts] ////

//// [constants.js]
module.exports = {
  str: 'x',
};

//// [constants.ts]
import * as tsConstants from "../lib/constants";
export { tsConstants };

//// [constants.js]
module.exports = {
    str: 'x',
};
//// [constants.js]
import * as tsConstants from "../lib/constants";
export { tsConstants };
