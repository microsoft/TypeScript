module M {
    export class B {
	    public x=10;
    }

    export class C extends B {
    }
}

module M {
    export class C2 extends B {
    }
}

module N {
    export class C3 extends M.B {
    }
}
