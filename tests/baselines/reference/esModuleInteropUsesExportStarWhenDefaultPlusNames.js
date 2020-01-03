//// [esModuleInteropUsesExportStarWhenDefaultPlusNames.ts]
import Deps, { var2 } from './dep';
void Deps;
void var2;

//// [esModuleInteropUsesExportStarWhenDefaultPlusNames.js]
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) b(k);
    result["default"] = mod;
    return result;
    function b(p) {
        if (Object.hasOwnProperty.call(mod, p))
            Object.create
                ? Object.defineProperty(result, p, {
                    enumerable: true,
                    get: function () {
                        return mod[p];
                    }
                })
                : (result[p] = mod[p]);
    }
};
exports.__esModule = true;
var dep_1 = __importStar(require("./dep"));
void dep_1["default"];
void dep_1.var2;
