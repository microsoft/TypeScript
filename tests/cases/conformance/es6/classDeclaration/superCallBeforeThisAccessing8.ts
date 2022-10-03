class Base {
    constructor(c) { }
}
class D extends Base {
    private _t;
    constructor() {
        let x = {
            k: super(undefined), 
            j: this._t,  // no error
        }
    }
}
