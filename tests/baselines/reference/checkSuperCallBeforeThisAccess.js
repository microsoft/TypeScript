//// [tests/cases/compiler/checkSuperCallBeforeThisAccess.ts] ////

//// [checkSuperCallBeforeThisAccess.ts]
class A {
    x = 1;
}

class C1 extends A {
    constructor(n: number) {
        let a1 = this;  // Error
        let a2 = this.x;  // Error
        let a3 = super.x;  // Error
        let a4 = () => this;
        let a5 = () => this.x;
        let a6 = () => super.x;
        if (!!true) {
            super();
            let b1 = this;
            let b2 = this.x;
            let b3 = super.x;
        }
        else {
            let c1 = this;  // Error
            let c2 = this.x;  // Error
            let c3 = super.x;  // Error
        }
        if (!!true) {
            switch (n) {
                case 1:
                    super();
                    let d1 = this.x;
                case 2:
                    let d2 = this.x;  // Error
                default:
                    super();
                    let d3 = this.x;
            }
            let d4 = this.x;
        }
        if (!!true) {
            let e1 = { w: !!true ? super() : 0 };
            let e2 = this.x;  // Error
            let e3 = { w: !!true ? super() : super() };
            let e4 = this.x;
        }
        let f1 = this;  // Error
        let f2 = this.x;  // Error
        let f3 = super.x;  // Error
    }
}

// Repro from #38512

export class Foo {
    constructor(value: number) {
    }
}

export class BarCorrectlyFails extends Foo {
    constructor(something: boolean) {
        if (!something) {
            const value = this.bar();  // Error
            super(value);
        }
        else {
            super(1337);
        }
    }
    bar(): number { return 4; }
}

export class BarIncorrectlyWorks extends Foo {
    constructor(something: boolean) {
        if (something) {
            super(1337);
        }
        else {
            const value = this.bar();  // Error
            super(value);
        }
    }
    bar(): number { return 4; }
}


//// [checkSuperCallBeforeThisAccess.js]
class A {
    constructor() {
        this.x = 1;
    }
}
class C1 extends A {
    constructor(n) {
        let a1 = this; // Error
        let a2 = this.x; // Error
        let a3 = super.x; // Error
        let a4 = () => this;
        let a5 = () => this.x;
        let a6 = () => super.x;
        if (!!true) {
            super();
            let b1 = this;
            let b2 = this.x;
            let b3 = super.x;
        }
        else {
            let c1 = this; // Error
            let c2 = this.x; // Error
            let c3 = super.x; // Error
        }
        if (!!true) {
            switch (n) {
                case 1:
                    super();
                    let d1 = this.x;
                case 2:
                    let d2 = this.x; // Error
                default:
                    super();
                    let d3 = this.x;
            }
            let d4 = this.x;
        }
        if (!!true) {
            let e1 = { w: !!true ? super() : 0 };
            let e2 = this.x; // Error
            let e3 = { w: !!true ? super() : super() };
            let e4 = this.x;
        }
        let f1 = this; // Error
        let f2 = this.x; // Error
        let f3 = super.x; // Error
    }
}
// Repro from #38512
export class Foo {
    constructor(value) {
    }
}
export class BarCorrectlyFails extends Foo {
    constructor(something) {
        if (!something) {
            const value = this.bar(); // Error
            super(value);
        }
        else {
            super(1337);
        }
    }
    bar() { return 4; }
}
export class BarIncorrectlyWorks extends Foo {
    constructor(something) {
        if (something) {
            super(1337);
        }
        else {
            const value = this.bar(); // Error
            super(value);
        }
    }
    bar() { return 4; }
}
