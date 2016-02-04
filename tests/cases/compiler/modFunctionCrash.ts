declare module Q {
    function f(fn:()=>void); // typechecking the function type should not crash the compiler
}


Q.f(function() {this;});