// @strict: true
// @declaration: true

class Base<T> {
    value!: T;
    protected hidden!: T;
    fluent(): this {
        return this;
    }
}

interface Derived<T> extends Base<T> {
    extra: T;
}

interface Further<T> extends Derived<T> {
    another: T;
}

declare const further: Further<string>;
export const fluent: Further<string> = further.fluent();
const wrongValue: number = further.value;
further.hidden;
further.missing;

interface Callable<T> {
    (value: T): T;
    new (value: T): Base<T>;
    [key: string]: T;
}

interface CallableDerived<T> extends Callable<T> {
    value: T;
}

declare const callable: CallableDerived<string>;
export const call: string = callable("");
export const construct: Base<string> = new callable("");
export const index: string = callable["other"];
callable(0);
new callable(0);

declare function mixin<C extends new (...args: any[]) => any>(base: C): C & {
    new (...args: any[]): { added: number };
};

export function factory<T>() {
    class Mixed extends mixin(Base<T>) {}
    interface Result extends Mixed {
        extra: T;
    }
    return null! as Result;
}

export const mixed = factory<string>();
export const inherited: string = mixed.value;
export const added: number = mixed.added;
export const mixedFluent: typeof mixed = mixed.fluent();
