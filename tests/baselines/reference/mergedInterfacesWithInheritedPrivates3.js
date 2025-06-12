//// [tests/cases/conformance/interfaces/declarationMerging/mergedInterfacesWithInheritedPrivates3.ts] ////

//// [mergedInterfacesWithInheritedPrivates3.ts]
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

//// [mergedInterfacesWithInheritedPrivates3.js]
class C {
}
class C2 {
}
class D extends C {
}
var M;
(function (M) {
    class C {
    }
    class C2 {
    }
})(M || (M = {}));
