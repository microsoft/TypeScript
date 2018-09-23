//// [tests/cases/compiler/importedAliasesInTypePositions.ts] ////

//// [file1.ts]
export module elaborate.nested.mod.name {
    export class ReferredTo {
        doSomething(): void {
        }
    }
}

//// [file2.ts]
import RT_ALIAS = require("file1");
import ReferredTo = RT_ALIAS.elaborate.nested.mod.name.ReferredTo;

export module ImportingModule {
    class UsesReferredType {
        constructor(private referred: ReferredTo) { }
    }
}

//// [file1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var elaborate = {};
    (function (elaborate) {
        var nested = elaborate.nested || (elaborate.nested = {});
        (function (nested) {
            var mod = nested.mod || (nested.mod = {});
            (function (mod) {
                var name = mod.name || (mod.name = {});
                (function (name) {
                    var ReferredTo = /** @class */ (function () {
                        function ReferredTo() {
                        }
                        ReferredTo.prototype.doSomething = function () {
                        };
                        return ReferredTo;
                    }());
                    name.ReferredTo = ReferredTo;
                })(name);
            })(mod);
        })(nested);
    })(elaborate);
});
//// [file2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var ImportingModule = {};
    (function (ImportingModule) {
        var UsesReferredType = /** @class */ (function () {
            function UsesReferredType(referred) {
                this.referred = referred;
            }
            return UsesReferredType;
        }());
    })(ImportingModule);
});
