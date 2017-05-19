//// [destructuringParameterProperties4.ts]
class C1<T, U, V> {
    constructor(private k: T, protected [a, b, c]: [T,U,V]) {
        if ((b === undefined && c === undefined) || (this.b === undefined && this.c === undefined)) {
            this.a = a || k;
        }
    }

    public getA() {
        return this.a
    }

    public getB() {
        return this.b
    }

    public getC() {
        return this.c;
    }
}

class C2 extends C1<number, string, boolean> {
    public doSomethingWithSuperProperties() {
        return `${this.a} ${this.b} ${this.c}`;
    }
}


//// [destructuringParameterProperties4.js]
class C1 {
    constructor(k, [a, b, c]) {
        this.k = k;
        if ((b === undefined && c === undefined) || (this.b === undefined && this.c === undefined)) {
            this.a = a || k;
        }
    }
    getA() {
        return this.a;
    }
    getB() {
        return this.b;
    }
    getC() {
        return this.c;
    }
}
class C2 extends C1 {
    doSomethingWithSuperProperties() {
        return `${this.a} ${this.b} ${this.c}`;
    }
}
