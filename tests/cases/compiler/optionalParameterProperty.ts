// @strictNullChecks: true

class C {
    p: number = 0;
}

class D extends C { 
    constructor(public p?: number) {
        super();
    }
}
