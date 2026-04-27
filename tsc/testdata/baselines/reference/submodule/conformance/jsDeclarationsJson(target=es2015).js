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
import j = require("./obj.json");
export = j;


//// [DtsFileErrors]


out/index.d.ts(1,20): error TS2307: Cannot find module './obj.json' or its corresponding type declarations.


==== out/index.d.ts (1 errors) ====
    import j = require("./obj.json");
                       ~~~~~~~~~~~~
!!! error TS2307: Cannot find module './obj.json' or its corresponding type declarations.
    export = j;
    
==== obj.json (0 errors) ====
    {
        "x": 12,
        "y": 12,
        "obj": {
            "items": [{"x": 12}, {"x": 12, "y": 12}, {"x": 0}, {"x": -1, "err": true}]
        }
    }