class BaseClass {
    constructor() {
        this._init();
    }
    private _init() {
    }
}
class DerivedClass extends BaseClass {
    constructor() {
        super();
    }
    private _init() {
    }
}
new DerivedClass();