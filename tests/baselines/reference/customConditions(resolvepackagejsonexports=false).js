//// [tests/cases/conformance/moduleResolution/customConditions.ts] ////

//// [package.json]
{
    "name": "lodash",
    "version": "1.0.0",
    "main": "index.js",
    "exports": {
        "browser": "./browser.js",
        "webpack": "./webpack.js",
        "default": "./index.js"
    }
}

//// [index.d.ts]
declare const _: "index";
export = _;

//// [browser.d.ts]
declare const _: "browser";
export default _;

//// [webpack.d.ts]
declare const _: "webpack";
export = _;

//// [index.ts]
import _ from "lodash";


//// [index.js]
