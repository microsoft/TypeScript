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

//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportingModule = void 0;
var ImportingModule;
(function (ImportingModule) {
    class UsesReferredType {
        constructor(referred) {
            this.referred = referred;
        }
    }
})(ImportingModule || (exports.ImportingModule = ImportingModule = {}));
