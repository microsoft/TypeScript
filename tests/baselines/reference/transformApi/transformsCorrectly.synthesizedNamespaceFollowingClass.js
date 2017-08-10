class C {
    constructor() {
        this.foo = 10;
    }
}
C.bar = 20;
var C;
(function (C) {
    C.x = 10;
})(C || (C = {}));
