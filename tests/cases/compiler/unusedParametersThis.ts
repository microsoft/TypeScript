//@noImplicitThis:true
//@noUnusedLocals:true
//@noUnusedParameters:true

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