// @noUnusedLocals:true 
// @noEmit: true
// @target: es2015

export class A {
    #used = "used";
    #unused = "unused";
    constructor () {
        console.log(this.#used);
    }
}

export class A2 {
    #used() {  };
    #unused() { };
    constructor () {
        console.log(this.#used());
    }
}

export class A3 {
    get #used() { return 0 };
    set #used(value: number) {  };
    
    get #unused() { return 0 };
    set #unused(value: number) {  };
    constructor () {
        console.log(this.#used);
    }
}