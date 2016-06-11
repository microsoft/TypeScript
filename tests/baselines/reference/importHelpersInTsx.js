//// [tests/cases/compiler/importHelpersInTsx.tsx] ////

//// [external.tsx]
declare var React: any;
declare var o: any;
export const x = <span {...o} />

//// [internal.tsx]
declare var React: any;
declare var o: any;
const x = <span {...o} />

//// [external.js]
"use strict";
var tslib_1 = require("tslib");
exports.x = React.createElement("span", tslib_1.__assign({}, o));
//// [internal.js]
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var x = React.createElement("span", __assign({}, o));
