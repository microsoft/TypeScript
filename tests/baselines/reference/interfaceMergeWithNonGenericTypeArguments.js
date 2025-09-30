//// [tests/cases/compiler/interfaceMergeWithNonGenericTypeArguments.ts] ////

//// [interfaceMergeWithNonGenericTypeArguments.ts]
export class SomeBaseClass { }
export interface SomeInterface { }
export interface MergedClass extends SomeInterface { }
export class MergedClass extends SomeBaseClass<any> {
	public constructor() {
		super();
	}
}

//// [interfaceMergeWithNonGenericTypeArguments.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MergedClass = exports.SomeBaseClass = void 0;
class SomeBaseClass {
}
exports.SomeBaseClass = SomeBaseClass;
class MergedClass extends SomeBaseClass {
    constructor() {
        super();
    }
}
exports.MergedClass = MergedClass;
