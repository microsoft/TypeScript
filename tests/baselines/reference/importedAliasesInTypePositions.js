//// [tests/cases/compiler/importedAliasesInTypePositions.ts] ////

//// [file1.ts]
export namespace elaborate.nested.mod.name {
    export class ReferredTo {
        doSomething(): void {
        }
    }
}

//// [file2.ts]
import RT_ALIAS = require("file1");
import ReferredTo = RT_ALIAS.elaborate.nested.mod.name.ReferredTo;

export namespace ImportingModule {
    class UsesReferredType {
        constructor(private referred: ReferredTo) { }
    }
}

//// [file1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.elaborate = void 0;
    var elaborate;
    (function (elaborate) {
        var nested;
        (function (nested) {
            var mod;
            (function (mod) {
                var name;
                (function (name) {
                    var ReferredTo = /** @class */ (function () {
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
    })(elaborate || (exports.elaborate = elaborate = {}));
});
//// [file2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImportingModule = void 0;
    var ImportingModule;
    (function (ImportingModule) {
        var UsesReferredType = /** @class */ (function () {
            function UsesReferredType(referred) {
                this.referred = referred;
            }
            return UsesReferredType;
        }());
    })(ImportingModule || (exports.ImportingModule = ImportingModule = {}));
});
