// @module:amd
// @Filename: file1.ts
export namespace elaborate.nested.mod.name {
    export class ReferredTo {
        doSomething(): void {
        }
    }
}

// @Filename: file2.ts
// @module: amd
import RT_ALIAS = require("file1");
import ReferredTo = RT_ALIAS.elaborate.nested.mod.name.ReferredTo;

export namespace ImportingModule {
    class UsesReferredType {
        constructor(private referred: ReferredTo) { }
    }
}