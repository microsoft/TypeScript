// @strict: true
// @noEmit: true

declare function base<T>(): new () => T;

function make<T extends object>() {
    class Weak extends base<T>() {
        optional?: string;
    }
    return Weak;
}

const C = make<() => void>();
const c: InstanceType<typeof C> = () => {};

function makeGeneric<T extends object>() {
    class Inner<U> extends base<T>() {
        u?: U;
    }
    return Inner;
}

const I = makeGeneric<{ req: string }>();
const i: InstanceType<typeof I> = { other: 1 } as { other: number };
