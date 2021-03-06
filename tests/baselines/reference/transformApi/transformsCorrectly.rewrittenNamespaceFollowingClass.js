class C {
    constructor() {
        this.foo = 10;
    }
}
(function () {
    C.bar = 20;
}).call(C);
(function (C) {
    C.x = 10;
})(C || (C = {}));
