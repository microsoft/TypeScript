// @strict: true
// @target: esnext

class Test1 {
    get foo(): string { return "" }
    set foo(s: string | number) {
        let a = s as string;
        let b = s as number;
    }

    get bar(): string | number { return "" }
    set bar(s: string | number | boolean) {
    }
}

interface Test2 {
    get foo(): string;
    set foo(s: string | number);

    get bar(): string | number;
    set bar(s: string | number | boolean);
}

type Test3 = {
    get foo(): string;
    set foo(s: string | number);

    get bar(): string | number;
    set bar(s: string | number | boolean);
};

{
    const t = new Test1();
    t.foo = 32;
    let m: string = t.foo;

    // See how CFA interacts with out-of-type writes
    t.bar = 42;
    let n: number = t.bar;
    t.bar = false;
    let o = t.bar;
}

{
    const t = {} as Test2;
    t.foo = 32;
    let m: string = t.foo;

    // See how CFA interacts with out-of-type writes
    t.bar = 42;
    let n: number = t.bar;
    t.bar = false;
    let o = t.bar;
}

{
    const t = {} as Test3;
    t.foo = 32;
    let m: string = t.foo;

    // See how CFA interacts with out-of-type writes
    t.bar = 42;
    let n: number = t.bar;
    t.bar = false;
    let o = t.bar;
}