// @target: esnext
// @declaration: true
// @emitDeclarationOnly: true

const k1 = Symbol();
const k2 = 'foo' as const;

const k3 = Symbol();
const k4 = 'prop' as const;

class Foo {
    static [k1](): number {
        return 1;
    }
    [k1](): string {
        return "";
    }

    static [k2]() {
        return 1;
    }
    [k2]() {
        return "";
    }

    static m1() {}
    m1() {}

    static [k3] = 1;
    [k3] = 1;

    static [k4] = 1;
    [k4] = 2;

    static p1 = 3;
    p1 = 4;
}

export const t1 = Foo[k1];
export const t2 = new Foo()[k1];

export const t3 = Foo[k2];
export const t4 = new Foo()[k2];

export const t5 = Foo.m1;
export const t6 = new Foo().m1;

export const t7 = Foo[k3];
export const t8 = new Foo()[k3];

export const t9 = Foo[k4];
export const t10 = new Foo()[k4];

export const t11 = Foo.p1;
export const t12 = new Foo().p1;
