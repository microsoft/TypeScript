class C {
    private x: number;
}

class C2 {
    private x: number;
}

interface A extends C { // error
    y: string;
}

interface A extends C2 { 
    z: string;
}

class D extends C implements A { // error
    y: string;
    z: string;
}

module M {
    class C {
        private x: string;
    }

    class C2 {
        private x: number;
    }

    interface A extends C { // error, privates conflict
        y: string;
    }

    interface A extends C2 {
        z: string;
    }
}