//// [commentsDottedModuleName.ts]

/** this is multi declare module*/
export module outerModule.InnerModule {
    /// class b comment
    export class b {
    }
}

//// [commentsDottedModuleName.js]
define(["require", "exports"], function (require, exports) {
    (function (outerModule) {
        (function (InnerModule) {
            var b = (function () {
                function b() {
                }
                return b;
            })();
            InnerModule.b = b;
        })(outerModule.InnerModule || (outerModule.InnerModule = {}));
        var InnerModule = outerModule.InnerModule;
    })(exports.outerModule || (exports.outerModule = {}));
    var outerModule = exports.outerModule;
});


//// [commentsDottedModuleName.d.ts]
export declare module outerModule.InnerModule {
    class b {
    }
}
