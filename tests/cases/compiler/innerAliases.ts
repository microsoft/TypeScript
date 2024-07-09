module A {
    export module B {
        export module C {
            export class Class1 {}
        }
    }
}

module D {
    import inner = A.B.C; 
   
    var c1 = new inner.Class1(); 

    export module E { 
        export class Class2 {}
    }
}

var c: D.inner.Class1;

c = new D.inner.Class1();

