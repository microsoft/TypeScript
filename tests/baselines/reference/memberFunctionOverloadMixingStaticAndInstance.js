//// [tests/cases/conformance/classes/propertyMemberDeclarations/memberFunctionDeclarations/memberFunctionOverloadMixingStaticAndInstance.ts] ////

//// [memberFunctionOverloadMixingStaticAndInstance.ts]
class C {
    foo();
    static foo(); // error
}

class D {
    static foo();
    foo(); // error    
}

class E<T> {
    foo(x: T);
    static foo(x: number); // error
}

class F<T> {
    static foo(x: number);
    foo(x: T); // error    
}

//// [memberFunctionOverloadMixingStaticAndInstance.js]
class C {
}
class D {
}
class E {
}
class F {
}
