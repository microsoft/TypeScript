//// [tests/cases/compiler/commentsDottedModuleName.ts] ////

//// [commentsDottedModuleName.ts]
/** this is multi declare module*/
export module outerModule.InnerModule {
    /// class b comment
    export class b {
    }
}

//// [commentsDottedModuleName.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outerModule = void 0;
/** this is multi declare module*/
var outerModule;
(function (outerModule) {
    let InnerModule;
    (function (InnerModule) {
        /// class b comment
        class b {
        }
        InnerModule.b = b;
    })(InnerModule = outerModule.InnerModule || (outerModule.InnerModule = {}));
})(outerModule || (exports.outerModule = outerModule = {}));
