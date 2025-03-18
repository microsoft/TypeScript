//// [tests/cases/compiler/gettersAndSettersAccessibility.ts] ////

//// [gettersAndSettersAccessibility.ts]
class C99 {
	private get Baz():number { return 0; }
	public set Baz(n:number) {} // error - accessors do not agree in visibility
}


//// [gettersAndSettersAccessibility.js]
class C99 {
    get Baz() { return 0; }
    set Baz(n) { }
}
