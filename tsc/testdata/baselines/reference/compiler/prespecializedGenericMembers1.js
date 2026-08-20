//// [tests/cases/compiler/prespecializedGenericMembers1.ts] ////

//// [prespecializedGenericMembers1.ts]
export interface IKitty {

    }

export class Cat<CatType extends IKitty> {
    constructor() {
    
    }
}

export class CatBag {
    constructor(cats: { barry: Cat<IKitty>; }) {
        
    }
}
var cat = new Cat<IKitty>();
var catThing = {
    barry: cat
};
var catBag = new CatBag(catThing);

//// [prespecializedGenericMembers1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatBag = exports.Cat = void 0;
class Cat {
    constructor() {
    }
}
exports.Cat = Cat;
class CatBag {
    constructor(cats) {
    }
}
exports.CatBag = CatBag;
var cat = new Cat();
var catThing = {
    barry: cat
};
var catBag = new CatBag(catThing);
