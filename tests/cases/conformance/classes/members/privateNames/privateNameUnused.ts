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
