//// [tests/cases/compiler/recursiveFieldSetting.ts] ////

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
class Recursive1 {
    constructor(parent) {
        this.parent = parent;
        this.depth = this.parent ? this.parent.depth + 1 : 0;
    }
}
class Recursive2 {
    constructor() {
        this.depth = this.parent.depth;
    }
}
class Recursive3 {
    constructor() {
        this.depth = this.parent.alpha;
        this.alpha = 0;
    }
}
