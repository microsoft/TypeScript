//// [tests/cases/compiler/optionalSetterParam.ts] ////

//// [optionalSetterParam.ts]
class foo {

    public set bar(param?:any) { }
}


//// [optionalSetterParam.js]
"use strict";
class foo {
    set bar(param) { }
}
