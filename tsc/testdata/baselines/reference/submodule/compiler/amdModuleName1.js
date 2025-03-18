//// [tests/cases/compiler/amdModuleName1.ts] ////

//// [amdModuleName1.ts]
///<amd-module name='NamedModule'/>
class Foo {
    x: number;
    constructor() {
        this.x = 5;
    }
}
export = Foo;


//// [amdModuleName1.js]
"use strict";
class Foo {
    x;
    constructor() {
        this.x = 5;
    }
}
module.exports = Foo;
