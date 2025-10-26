namespace M {
    export class B {
	    public x=10;
    }

    export class C extends B {
    }
}

namespace M {
    export class C2 extends B {
    }
}

namespace N {
    export class C3 extends M.B {
    }
}
