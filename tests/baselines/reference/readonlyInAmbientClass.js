//// [tests/cases/conformance/classes/constructorDeclarations/constructorParameters/readonlyInAmbientClass.ts] ////

//// [readonlyInAmbientClass.ts]
declare class C{
	constructor(readonly x: number);
	method(readonly x: number);
}

//// [readonlyInAmbientClass.js]
