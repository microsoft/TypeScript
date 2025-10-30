//// [tests/cases/compiler/implicitAnyAmbients.ts] ////

//// [implicitAnyAmbients.ts]
declare namespace m {
    var x; // error
    var y: any;

    function f(x); // error 
    function f2(x: any); // error
    function f3(x: any): any;

    interface I {
        foo(); // error
        foo2(x: any); // error
        foo3(x: any): any;
    }

    class C {
        foo(); // error
        foo2(x: any); // error
        foo3(x: any): any;
    }

    namespace n {
        var y; // error
    }

    import m2 = n;
}

//// [implicitAnyAmbients.js]
