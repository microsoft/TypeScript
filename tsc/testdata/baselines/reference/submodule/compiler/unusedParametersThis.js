//// [tests/cases/compiler/unusedParametersThis.ts] ////

//// [unusedParametersThis.ts]
class A {
    public a: number;

    public method(this: this): number {
        return this.a;
    }

    public method2(this: A): number {
        return this.a;
    }

    public method3(this: this): number {
        var fn = () => this.a;
        return fn();
    }

    public method4(this: A): number {
        var fn = () => this.a;
        return fn();
    }

    static staticMethod(this: A): number {
        return this.a;
    }
}

function f(this: A): number {
    return this.a
}

var f2 = function f2(this: A): number {
    return this.a;
};

//// [unusedParametersThis.js]
class A {
    a;
    method() {
        return this.a;
    }
    method2() {
        return this.a;
    }
    method3() {
        var fn = () => this.a;
        return fn();
    }
    method4() {
        var fn = () => this.a;
        return fn();
    }
    static staticMethod() {
        return this.a;
    }
}
function f() {
    return this.a;
}
var f2 = function f2() {
    return this.a;
};
