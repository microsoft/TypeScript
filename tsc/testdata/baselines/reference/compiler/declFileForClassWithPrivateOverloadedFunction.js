//// [tests/cases/compiler/declFileForClassWithPrivateOverloadedFunction.ts] ////

//// [declFileForClassWithPrivateOverloadedFunction.ts]
class C {
    private foo(x: number);
    private foo(x: string);
    private foo(x: any) { }
}

//// [declFileForClassWithPrivateOverloadedFunction.js]
"use strict";
class C {
    foo(x) { }
}


//// [declFileForClassWithPrivateOverloadedFunction.d.ts]
declare class C {
    private foo;
}
