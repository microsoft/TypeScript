//// [tests/cases/compiler/modFunctionCrash.ts] ////

//// [modFunctionCrash.ts]
declare namespace Q {
    function f(fn:()=>void); // typechecking the function type shouldnot crash the compiler
}


Q.f(function() {this;});

//// [modFunctionCrash.js]
Q.f(function () { this; });
