export class SomeBaseClass { }
export interface SomeInterface { }
export interface MergedClass extends SomeInterface { }
export class MergedClass extends SomeBaseClass<any> {
	public constructor() {
		super();
	}
}