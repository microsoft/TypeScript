//// [tests/cases/compiler/disableDynamicImportExtensionRewriting.ts] ////

//// [globals.d.ts]
declare function require(specifier: string): any;

//// [imports.ts]
import { path } from "./target.ts";
export { path } from "./target.ts";

import("./target.ts");
import(`./target.ts`);
import(path);
import(`./${path}`);
import(import("./target.ts") as any);
require(path);

//// [requires.js]
export {};
require("./target.ts");
require(`./target.ts`);
require("./" + "target.ts");
require(require("./target.ts").path);
import("./target.ts");
import(require("./target.ts").path);

//// [target.ts]
export const path = "./target.ts";


//// [target.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.path = void 0;
exports.path = "./target.ts";
//// [imports.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx, extraExtensions, ignoreCase) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        if (extraExtensions) {
            for (var extension in extraExtensions) {
                var suffix = path.slice(-extension.length);
                if (suffix === extension || ignoreCase && suffix.toLowerCase() === extension.toLowerCase()) {
                    var output = extraExtensions[extension];
                    return output === extension ? path : path.slice(0, -extension.length) + output;
                }
            }
        }
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
        });
    }
    return path;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.path = void 0;
const target_ts_1 = require("./target.js");
var target_ts_2 = require("./target.js");
Object.defineProperty(exports, "path", { enumerable: true, get: function () { return target_ts_2.path; } });
Promise.resolve().then(() => __importStar(require("./target.js")));
Promise.resolve(`${__rewriteRelativeImportExtension(`./target.ts`)}`).then(s => __importStar(require(s)));
Promise.resolve(`${__rewriteRelativeImportExtension(target_ts_1.path)}`).then(s => __importStar(require(s)));
Promise.resolve(`${__rewriteRelativeImportExtension(`./${target_ts_1.path}`)}`).then(s => __importStar(require(s)));
Promise.resolve(`${__rewriteRelativeImportExtension(Promise.resolve().then(() => __importStar(require("./target.js"))))}`).then(s => __importStar(require(s)));
require(target_ts_1.path);
//// [requires.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx, extraExtensions, ignoreCase) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        if (extraExtensions) {
            for (var extension in extraExtensions) {
                var suffix = path.slice(-extension.length);
                if (suffix === extension || ignoreCase && suffix.toLowerCase() === extension.toLowerCase()) {
                    var output = extraExtensions[extension];
                    return output === extension ? path : path.slice(0, -extension.length) + output;
                }
            }
        }
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
        });
    }
    return path;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./target.js");
require(`./target.ts`);
require(__rewriteRelativeImportExtension("./" + "target.ts"));
require(__rewriteRelativeImportExtension(require("./target.js").path));
Promise.resolve().then(() => __importStar(require("./target.js")));
Promise.resolve(`${__rewriteRelativeImportExtension(require("./target.js").path)}`).then(s => __importStar(require(s)));
