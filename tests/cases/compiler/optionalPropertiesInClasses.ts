interface ifoo {
	x?:number;
	y:number;
}

class C1 implements ifoo {
	public y:number;
}

class C2 implements ifoo { // ERROR - still need 'y'
	public x:number;
}

class C3 implements ifoo {
	public x:number;
	public y:number;
}