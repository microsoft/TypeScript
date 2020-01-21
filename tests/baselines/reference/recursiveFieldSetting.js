//// [recursiveFieldSetting.ts]
// #32721

class Recursive1 {
    constructor(private readonly parent?: Recursive1) {}
    private depth: number = this.parent ? this.parent.depth + 1 : 0;
}

class Recursive2 {
    parent!: Recursive2;
    depth: number = this.parent.depth;
}

class Recursive3 {
    parent!: Recursive3;
    depth: number = this.parent.alpha;
    alpha = 0;
}


//// [recursiveFieldSetting.js]
// #32721
var Recursive1 = /** @class */ (function () {
    function Recursive1(parent) {
        this.parent = parent;
        this.depth = this.parent ? this.parent.depth + 1 : 0;
    }
    return Recursive1;
}());
var Recursive2 = /** @class */ (function () {
    function Recursive2() {
        this.depth = this.parent.depth;
    }
    return Recursive2;
}());
var Recursive3 = /** @class */ (function () {
    function Recursive3() {
        this.depth = this.parent.alpha;
        this.alpha = 0;
    }
    return Recursive3;
}());
