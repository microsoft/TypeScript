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
    var elaborate;
    (function (elaborate) {
        var nested;
        (function (nested) {
            var mod;
            (function (mod) {
                var name;
                (function (name) {
                    var ReferredTo = (function () {
                        function ReferredTo() {
                        }
                        ReferredTo.prototype.doSomething = function () {
                        };
                        return ReferredTo;
                    }());
                    name.ReferredTo = ReferredTo;
                })(name = mod.name || (mod.name = {}));
            })(mod = nested.mod || (nested.mod = {}));
        })(nested = elaborate.nested || (elaborate.nested = {}));
    })(elaborate = exports.elaborate || (exports.elaborate = {}));
});
//// [file2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var ImportingModule;
    (function (ImportingModule) {
        var UsesReferredType = (function () {
            function UsesReferredType(referred) {
                this.referred = referred;
            }
            return UsesReferredType;
        }());
    })(ImportingModule = exports.ImportingModule || (exports.ImportingModule = {}));
});
