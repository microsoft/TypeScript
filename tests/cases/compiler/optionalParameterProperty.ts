// @strictNullChecks: true

class C {
    p: number;
}

class D extends C { 
    constructor(public p?: number) {
        super();
    }
}
