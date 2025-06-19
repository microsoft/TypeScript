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
export = {
    x: {
        y: "value"
    }
};
module.exports = {
    x: {
        y: "value"
    }
};
//// [requireTwoPropertyAccesses.js]
const value = require("./mod").x.y;
console.log(value);
