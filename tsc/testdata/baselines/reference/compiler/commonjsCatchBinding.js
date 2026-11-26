//// [tests/cases/compiler/commonjsCatchBinding.ts] ////

//// [a.ts]
export const x = "x";
export default "y";

//// [b.ts]
import y, { x } from "./a";
export let z = "z";

try {
    throw {};
} catch ({ a = x }: any) {
    console.log(a);
}

try {
    throw {};
} catch ({ a = z }: any) {
    console.log(a);
}

try {
    throw { a: {} };
} catch ({ a: { b = y } }: any) {
    console.log(b);
}

try {
    throw { x: 1, z: 2 };
} catch ({ [x]: a, [z]: b }: any) {
    console.log(a, b);
}

try {
    throw [];
} catch ([a = x, b = y, c = z]: any) {
    console.log(a, b, c);
}

try {
    throw {};
} catch ({ z = "a", a = z }: any) {
    console.log(z, a);
}

try {
    throw "a";
} catch (x) {
    console.log(x);
}

try {
    throw 0;
} catch {
    console.log(x);
}

try {
    throw {};
} catch ({ a = x }: any) {
    var w = a;
}
export { w };

function f1() {
    try {
        throw {};
    } catch ({ a = x, b = z }: any) {
        console.log(a, b);
    }
}
f1();


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = "x";
exports.default = "y";
//// [b.js]
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.w = exports.z = void 0;
const a_1 = __importStar(require("./a"));
exports.z = "z";
try {
    throw {};
}
catch ({ a = a_1.x }) {
    console.log(a);
}
try {
    throw {};
}
catch ({ a = exports.z }) {
    console.log(a);
}
try {
    throw { a: {} };
}
catch ({ a: { b = a_1.default } }) {
    console.log(b);
}
try {
    throw { x: 1, z: 2 };
}
catch ({ [a_1.x]: a, [exports.z]: b }) {
    console.log(a, b);
}
try {
    throw [];
}
catch ([a = a_1.x, b = a_1.default, c = exports.z]) {
    console.log(a, b, c);
}
try {
    throw {};
}
catch ({ z = "a", a = z }) {
    console.log(z, a);
}
try {
    throw "a";
}
catch (x) {
    console.log(x);
}
try {
    throw 0;
}
catch {
    console.log(a_1.x);
}
try {
    throw {};
}
catch ({ a = a_1.x }) {
    var w = a;
    exports.w = w;
}
function f1() {
    try {
        throw {};
    }
    catch ({ a = a_1.x, b = exports.z }) {
        console.log(a, b);
    }
}
f1();
