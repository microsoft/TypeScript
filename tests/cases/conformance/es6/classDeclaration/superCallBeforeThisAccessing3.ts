class Base {
    constructor(c) { }
}
class D extends Base {
    private _t;
    constructor() {
        let x = () => { this._t };
        x();  // no error; we only check super is called before this when the container is a constructor
        this._t;  // error
        super(undefined);
    }
}
