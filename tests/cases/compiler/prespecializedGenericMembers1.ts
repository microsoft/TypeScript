//@module: commonjs
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