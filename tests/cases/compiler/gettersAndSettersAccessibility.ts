class C99 {
	private get Baz():number { return 0; }
	public set Baz(n:number) {} // error - accessors do not agree in visibility
}
