// @strict: true

type A = {
    a: number;
    b?: string;
    readonly c: boolean;
    d: unknown;
};

type B = Omit<A, 'a'>;

function f(x: B) {
    const b = x.b;
    x.b = "hello";
    x.b = undefined;

    const c = x.c;
    x.c = true;

    const d = x.d;
    x.d = d;
}
