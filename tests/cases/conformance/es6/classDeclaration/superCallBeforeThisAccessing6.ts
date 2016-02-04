class Base {
    constructor(c) { }
}
class D extends Base {
    private _t;
    constructor() {
        super(this); 
    }
}
