class Base {
    constructor(func: ()=>Base) {
    }
}
class Super extends Base {
    constructor() {
        super((() => this)); // No error
    }
}