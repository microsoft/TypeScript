//// [tests/cases/compiler/commentsDottedModuleName.ts] ////

//// [commentsDottedModuleName.ts]
/** this is multi declare module*/
export module outerModule.InnerModule {
    /// class b comment
    export class b {
    }
}

//// [commentsDottedModuleName.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.outerModule = void 0;
    /** this is multi declare module*/
    var outerModule;
    (function (outerModule) {
        var InnerModule;
        (function (InnerModule) {
            /// class b comment
            var b = /** @class */ (function () {
                function b() {
                }
                return b;
            }());
            InnerModule.b = b;
        })(InnerModule = outerModule.InnerModule || (outerModule.InnerModule = {}));
    })(outerModule || (exports.outerModule = outerModule = {}));
});


//// [commentsDottedModuleName.d.ts]
/** this is multi declare module*/
export declare namespace outerModule.InnerModule {
    class b {
    }
}
