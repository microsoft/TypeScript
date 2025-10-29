namespace A {
    export namespace B {
        export namespace C {
            export class Class1 {}
        }
    }
}

namespace D {
    import inner = A.B.C; 
   
    var c1 = new inner.Class1(); 

    export namespace E { 
        export class Class2 {}
    }
}

var c: D.inner.Class1;

c = new D.inner.Class1();

