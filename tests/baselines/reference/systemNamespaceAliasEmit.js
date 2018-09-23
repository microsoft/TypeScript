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
System.register([], function (exports_1, context_1) {
    "use strict";
    var ns, AnEnum;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            ns = {};
            exports_1("ns", ns);
            exports_1("FooBar", ns);
            (function (ns) {
                var value = 1;
            })(ns);
            AnEnum = {};
            exports_1("AnEnum", AnEnum);
            exports_1("BarEnum", AnEnum);
            (function (AnEnum) {
                AnEnum[AnEnum["ONE"] = 0] = "ONE";
                AnEnum[AnEnum["TWO"] = 1] = "TWO";
            })(AnEnum);
        }
    };
});
