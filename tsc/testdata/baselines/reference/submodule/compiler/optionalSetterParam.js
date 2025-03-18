//// [tests/cases/compiler/optionalSetterParam.ts] ////

//// [optionalSetterParam.ts]
class foo {

    public set bar(param?:any) { }
}


//// [optionalSetterParam.js]
class foo {
    set bar(param) { }
}
