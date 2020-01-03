//// [tests/cases/compiler/esModuleInteropImportCall.ts] ////

//// [foo.d.ts]
declare function foo(): void;
declare namespace foo {}
export = foo;

//// [index.ts]
import("./foo").then(f => {
    f.default;
});

//// [index.js]
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
Promise.resolve().then(function () { return __importStar(require("./foo")); }).then(function (f) {
    f["default"];
});
