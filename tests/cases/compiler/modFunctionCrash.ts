declare module Q {
    function f(fn:()=>void); // typechecking the function type shouldnot crash the compiler
}


Q.f(function() {this;});