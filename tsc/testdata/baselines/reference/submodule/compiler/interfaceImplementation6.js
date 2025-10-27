//// [tests/cases/compiler/interfaceImplementation6.ts] ////

//// [interfaceImplementation6.ts]
interface I1 {
    item:number;
}

class C1 implements I1 {
    public item:number;
}

class C2 implements I1 {
    private item:number;
}

class C3 implements I1 {
    constructor() {
       var item: number;
    }
}
 
export class Test {
    private pt: I1 = { item: 1 };
}




//// [interfaceImplementation6.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
class C1 {
    item;
}
class C2 {
    item;
}
class C3 {
    constructor() {
        var item;
    }
}
class Test {
    pt = { item: 1 };
}
exports.Test = Test;
