type Constructor<T> = new(...args: any[]) => T;

class A {
    a!: number;
}
class B {
    b!: number;
}
function mixinC<TBase extends Constructor<{}>>(Base: TBase) {
    return class C<T> extends Base {
        c!: T;
    };
}

const ACB = mixinC(A)<B>;
const acb = new ACB();
const acbC: B = acb.c;

class D {
    d!: number;
}

const ACBCD = mixinC(ACB)<D>;
const acbcd = new ACBCD();
const acbcdC: ACB = acbcd.c;
