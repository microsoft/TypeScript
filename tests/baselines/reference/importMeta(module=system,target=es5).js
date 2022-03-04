//// [tests/cases/conformance/es2019/importMeta/importMeta.ts] ////

//// [example.ts]
// Adapted from https://github.com/tc39/proposal-import-meta/tree/c3902a9ffe2e69a7ac42c19d7ea74cbdcea9b7fb#example
(async () => {
  const response = await fetch(new URL("../hamsters.jpg", import.meta.url).toString());
  const blob = await response.blob();

  const size = import.meta.scriptElement.dataset.size || 300;

  const image = new Image();
  image.src = URL.createObjectURL(blob);
  image.width = image.height = size;

  document.body.appendChild(image);
})();

//// [moduleLookingFile01.ts]
export let x = import.meta;
export let y = import.metal;
export let z = import.import.import.malkovich;

//// [scriptLookingFile01.ts]
let globalA = import.meta;
let globalB = import.metal;
let globalC = import.import.import.malkovich;

//// [assignmentTargets.ts]
export const foo: ImportMeta = import.meta.blah = import.meta.blue = import.meta;
import.meta = foo;

// @Filename augmentations.ts
declare global {
  interface ImportMeta {
    wellKnownProperty: { a: number, b: string, c: boolean };
  }
}

const { a, b, c } = import.meta.wellKnownProperty;

//// [example.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (this && this.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            // Adapted from https://github.com/tc39/proposal-import-meta/tree/c3902a9ffe2e69a7ac42c19d7ea74cbdcea9b7fb#example
            (function () { return __awaiter(void 0, void 0, void 0, function () {
                var response, blob, size, image;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch(new URL("../hamsters.jpg", context_1.meta.url).toString())];
                        case 1:
                            response = _a.sent();
                            return [4 /*yield*/, response.blob()];
                        case 2:
                            blob = _a.sent();
                            size = context_1.meta.scriptElement.dataset.size || 300;
                            image = new Image();
                            image.src = URL.createObjectURL(blob);
                            image.width = image.height = size;
                            document.body.appendChild(image);
                            return [2 /*return*/];
                    }
                });
            }); })();
        }
    };
});
//// [moduleLookingFile01.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var x, y, z;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("x", x = context_1.meta);
            exports_1("y", y = import.metal);
            exports_1("z", z = import.import.import.malkovich);
        }
    };
});
//// [scriptLookingFile01.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var globalA, globalB, globalC;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            globalA = context_1.meta;
            globalB = import.metal;
            globalC = import.import.import.malkovich;
        }
    };
});
//// [assignmentTargets.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var foo, _a, a, b, c;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("foo", foo = context_1.meta.blah = context_1.meta.blue = context_1.meta);
            context_1.meta = foo;
            _a = context_1.meta.wellKnownProperty, a = _a.a, b = _a.b, c = _a.c;
        }
    };
});
