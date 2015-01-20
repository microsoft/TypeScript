// @target: es6

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
