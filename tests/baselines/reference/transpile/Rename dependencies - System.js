System.register(["SomeOtherName"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SomeName_1;
    return {
        setters: [
            function (SomeName_1_1) {
                SomeName_1 = SomeName_1_1;
            }
        ],
        execute: function () {
            use(SomeName_1.foo);
        }
    };
});
//# sourceMappingURL=file.js.map