//// [tests/cases/compiler/typeParametersAndParametersInComputedNames.ts] ////

//// [typeParametersAndParametersInComputedNames.ts]
function foo<T>(a: T) : string {
    return "";
}

class A {
    [foo<T>(a)]<T>(a: T) {  
    }
}

//// [typeParametersAndParametersInComputedNames.js]
"use strict";
function foo(a) {
    return "";
}
class A {
    [foo(a)](a) {
    }
}
