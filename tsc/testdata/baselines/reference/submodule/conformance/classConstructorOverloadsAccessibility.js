//// [tests/cases/conformance/classes/constructorDeclarations/classConstructorOverloadsAccessibility.ts] ////

//// [classConstructorOverloadsAccessibility.ts]
class A {
	public constructor(a: boolean) // error
	protected constructor(a: number) // error
	private constructor(a: string)
	private constructor() { 
		
	}
}

class B {
	protected constructor(a: number) // error
	constructor(a: string)
	constructor() { 
		
	}
}

class C {
	protected constructor(a: number)
	protected constructor(a: string)
	protected constructor() { 
		
	}
}

class D {
	constructor(a: number)
	constructor(a: string)
	public constructor() { 
		
	}
}

//// [classConstructorOverloadsAccessibility.js]
class A {
    constructor() {
    }
}
class B {
    constructor() {
    }
}
class C {
    constructor() {
    }
}
class D {
    constructor() {
    }
}
