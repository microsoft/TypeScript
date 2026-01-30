//// [tests/cases/conformance/salsa/requireTwoPropertyAccesses.ts] ////

//// [mod.js]
module.exports = {
    x: {
        y: "value"
    }
}
//// [requireTwoPropertyAccesses.js]
const value = require("./mod").x.y
console.log(value)


//// [mod.js]
"use strict";
module.exports = {
    x: {
        y: "value"
    }
};
//// [requireTwoPropertyAccesses.js]
"use strict";
var value = require("./mod").x.y;
console.log(value);
