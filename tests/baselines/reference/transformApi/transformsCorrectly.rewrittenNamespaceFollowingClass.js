class C {
    constructor() {
        this.foo = 10;
    }
}
C.bar = 20;
(function (C) {
    C.x = 10;
})(C || (C = {}));
