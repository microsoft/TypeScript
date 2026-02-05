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
export class SomeBaseClass {
}
export class MergedClass extends SomeBaseClass {
    constructor() {
        super();
    }
}
