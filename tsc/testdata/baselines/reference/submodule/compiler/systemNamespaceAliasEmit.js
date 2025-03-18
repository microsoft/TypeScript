//// [tests/cases/compiler/systemNamespaceAliasEmit.ts] ////

//// [systemNamespaceAliasEmit.ts]
namespace ns {
    const value = 1;
}

enum AnEnum {
    ONE,
    TWO
}

export {ns, AnEnum, ns as FooBar, AnEnum as BarEnum};

//// [systemNamespaceAliasEmit.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarEnum = exports.FooBar = exports.AnEnum = exports.ns = void 0;
var ns;
(function (ns) {
    const value = 1;
})(ns || (exports.FooBar = exports.ns = ns = {}));
var AnEnum;
(function (AnEnum) {
    AnEnum[AnEnum["ONE"] = 0] = "ONE";
    AnEnum[AnEnum["TWO"] = 1] = "TWO";
})(AnEnum || (exports.BarEnum = exports.AnEnum = AnEnum = {}));
