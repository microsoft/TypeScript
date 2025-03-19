//// [tests/cases/compiler/amdModuleName2.ts] ////

//// [amdModuleName2.ts]
///<amd-module name='FirstModuleName'/>
///<amd-module name='SecondModuleName'/>
class Foo {
    x: number;
    constructor() {
        this.x = 5;
    }
}
export = Foo;


//// [amdModuleName2.js]
"use strict";
///<amd-module name='FirstModuleName'/>
///<amd-module name='SecondModuleName'/>
class Foo {
    x;
    constructor() {
        this.x = 5;
    }
}
module.exports = Foo;
