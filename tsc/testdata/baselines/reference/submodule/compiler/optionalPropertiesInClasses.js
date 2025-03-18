//// [tests/cases/compiler/optionalPropertiesInClasses.ts] ////

//// [optionalPropertiesInClasses.ts]
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

//// [optionalPropertiesInClasses.js]
class C1 {
    y;
}
class C2 {
    x;
}
class C3 {
    x;
    y;
}
