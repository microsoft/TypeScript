//// [tests/cases/conformance/es2020/modules/exportAsNamespace4.ts] ////

//// [0.ts]
export const a = 1;
export const b = 2;

//// [1.ts]
export * as default from './0';

//// [11.ts]
import * as ns from './0';
export default ns;

//// [2.ts]
import foo from './1'
import foo1 from './11'

foo.a;
foo1.a;

foo.b;
foo1.b;

//// [0.js]
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.b = exports.a = void 0;
    exports.a = 1;
    exports.b = 2;
});
//// [1.js]
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./0"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    exports["default"] = __importStar(require("./0"));
});
//// [11.js]
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./0"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var ns = __importStar(require("./0"));
    exports["default"] = ns;
});
//// [2.js]
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./1", "./11"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var _1_1 = __importDefault(require("./1"));
    var _11_1 = __importDefault(require("./11"));
    _1_1["default"].a;
    _11_1["default"].a;
    _1_1["default"].b;
    _11_1["default"].b;
});


//// [0.d.ts]
export declare const a = 1;
export declare const b = 2;
//// [1.d.ts]
export * as default from './0';
//// [11.d.ts]
import * as ns from './0';
export default ns;
//// [2.d.ts]
export {};
