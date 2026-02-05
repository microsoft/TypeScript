//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsJson.ts] ////

//// [index.js]
const j = require("./obj.json");
module.exports = j;
//// [obj.json]
{
    "x": 12,
    "y": 12,
    "obj": {
        "items": [{"x": 12}, {"x": 12, "y": 12}, {"x": 0}, {"x": -1, "err": true}]
    }
}

//// [obj.json]
{
    "x": 12,
    "y": 12,
    "obj": {
        "items": [{ "x": 12 }, { "x": 12, "y": 12 }, { "x": 0 }, { "x": -1, "err": true }]
    }
}
//// [index.js]
"use strict";
const j = require("./obj.json");
module.exports = j;


//// [index.d.ts]
export = j;
