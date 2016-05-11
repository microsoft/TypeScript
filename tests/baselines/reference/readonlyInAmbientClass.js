//// [readonlyInAmbientClass.ts]
declare class C{
	constructor(readonly x: number);
	method(readonly x: number);
}

//// [readonlyInAmbientClass.js]
