//// [tests/cases/compiler/importHelpersInTsx.tsx] ////

//// [external.tsx]
declare var React: any;
declare var o: any;
export const x = <span {...o} />

//// [script.tsx]
declare var React: any;
declare var o: any;
const x = <span {...o} />

//// [tslib.d.ts]
export declare function __extends(d: Function, b: Function): void;
export declare function __assign(t: any, ...sources: any[]): any;
export declare function __decorate(decorators: Function[], target: any, key?: string | symbol, desc?: any): any;
export declare function __param(paramIndex: number, decorator: Function): Function;
export declare function __metadata(metadataKey: any, metadataValue: any): Function;
export declare function __awaiter(thisArg: any, _arguments: any, P: Function, generator: Function): any;


//// [external.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
var tslib_1 = require("tslib");
exports.x = React.createElement("span", (0, tslib_1.__assign)({}, o));
//// [script.js]
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var x = React.createElement("span", __assign({}, o));
