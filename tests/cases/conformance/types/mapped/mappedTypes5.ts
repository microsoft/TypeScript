// @strict: true

function f<T>(p: Partial<T>, r: Readonly<T>, pr: Partial<Readonly<T>>, rp: Readonly<Partial<T>>) {
    let a1: Partial<T> = p;
    let a2: Partial<T> = r;
    let a3: Partial<T> = pr;
    let a4: Partial<T> = rp;
    let b1: Readonly<T> = p;  // Error
    let b2: Readonly<T> = r;
    let b3: Readonly<T> = pr;  // Error
    let b4: Readonly<T> = rp;  // Error
    let c1: Partial<Readonly<T>> = p;
    let c2: Partial<Readonly<T>> = r;
    let c3: Partial<Readonly<T>> = pr;
    let c4: Partial<Readonly<T>> = rp;
    let d1: Readonly<Partial<T>> = p;
    let d2: Readonly<Partial<T>> = r;
    let d3: Readonly<Partial<T>> = pr;
    let d4: Readonly<Partial<T>> = rp;
}

// Repro from #17682

type State = {
    [key: string]: string | boolean | number | null;
};

type Args1<T extends State> = {
    readonly previous: Readonly<Partial<T>>;
    readonly current: Readonly<Partial<T>>;
};

type Args2<T extends State> = {
    readonly previous: Partial<Readonly<T>>;
    readonly current: Partial<Readonly<T>>;
};

function doit<T extends State>() {
    let previous: Partial<T> = Object.create(null);
    let current: Partial<T> = Object.create(null);
    let args1: Args1<T> = { previous, current };
    let args2: Args2<T> = { previous, current };
}

type State2 = { foo: number, bar: string };

type Args3 = {
    readonly previous: Readonly<Partial<State2>>;
    readonly current: Readonly<Partial<State2>>;
};

type Args4 = {
    readonly previous: Partial<Readonly<State2>>;
    readonly current: Partial<Readonly<State2>>;
};

function doit2() {
    let previous: Partial<State2> = Object.create(null);
    let current: Partial<State2> = Object.create(null);
    let args1: Args3 = { previous, current };
    let args2: Args4 = { previous, current };
}
