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
var j = require("./obj.json");
module.exports = j;


//// [index.d.ts]
export = j;
declare const j: {
    x: number;
    y: number;
    obj: {
        items: ({
            x: number;
            y?: undefined;
            err?: undefined;
        } | {
            x: number;
            y: number;
            err?: undefined;
        } | {
            x: number;
            err: boolean;
            y?: undefined;
        })[];
    };
};
